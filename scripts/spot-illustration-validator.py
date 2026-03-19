#!/usr/bin/env python3
"""
Spot Illustration SVG Validator

This script validates SVG files in the spot-illustrations folder according to specific rules:

Parts and Colors:
- background: silver
- outline: black  
- highlight: cadetblue
- success: green
- warning: orange
- danger: red

Rules:
- SVGs should be clean and minimalistic
- Every figure should have a part property matching one of the valid parts
- Every file can only have one figure for every part
- Figures can only have dimensional properties and fill color corresponding to their part
- SVG tag should only have viewbox, width, height and xmlns attributes
- No defs, no styles
"""

import os
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from typing import Dict, List, Set, Tuple, Optional
import argparse
import re


class SVGValidator:
    """Validates SVG files according to spot illustration rules."""
    
    VALID_PARTS = {
        'background': 'silver',
        'outline': 'black',
        'highlight': 'cadetblue', 
        'success': 'green',
        'warning': 'orange',
        'danger': 'red'
    }
    
    ALLOWED_SVG_ATTRIBUTES = {'viewBox', 'width', 'height', 'xmlns', 'version', 'xmlns:xlink'}
    DIMENSIONAL_ATTRIBUTES = {
        'x', 'y', 'width', 'height', 'cx', 'cy', 'r', 'rx', 'ry', 
        'd', 'points', 'x1', 'y1', 'x2', 'y2', 'transform'
    }
    
    # Valid filename pattern: only letters, numbers, hyphens, underscores, and dots
    VALID_FILENAME_PATTERN = re.compile(r'^[a-zA-Z0-9._-]+\.svg$')
    
    def __init__(self, folder_path: str):
        """Initialize validator with folder path."""
        self.folder_path = Path(folder_path)
        self.errors = []
        self.warnings = []
    
    def validate_all_files(self) -> bool:
        """Validate all SVG files in the folder."""
        if not self.folder_path.exists():
            print(f"Error: Folder {self.folder_path} does not exist")
            return False
            
        svg_files = list(self.folder_path.glob("*.svg"))
        if not svg_files:
            print(f"No SVG files found in {self.folder_path}")
            return False
            
        print(f"Validating {len(svg_files)} SVG files in {self.folder_path}")
        print("=" * 60)
        
        all_valid = True
        valid_files = []
        files_with_errors = []
        
        for svg_file in sorted(svg_files):
            file_valid = self.validate_file(svg_file)
            if file_valid:
                valid_files.append(svg_file.name)
            else:
                files_with_errors.append(svg_file.name)
            all_valid = all_valid and file_valid
            print()  # Add spacing between files
            
        # Summary
        print("=" * 60)
        print("SUMMARY")
        print("=" * 60)
        print(f"✅ Valid files ({len(valid_files)}):")
        for file in valid_files:
            print(f"  • {file}")
        
        if files_with_errors:
            print(f"\n❌ Files with errors ({len(files_with_errors)}):")
            for file in files_with_errors:
                print(f"  • {file}")
        
        return all_valid
    
    def validate_file(self, file_path: Path) -> bool:
        """Validate a single SVG file."""
        print(f"Validating: {file_path.name}")
        
        # Reset errors for this file
        file_errors = []
        file_warnings = []
        
        # Validate filename
        self._validate_filename(file_path.name, file_errors)
        
        try:
            # Parse XML
            tree = ET.parse(file_path)
            root = tree.getroot()
            
            # Validate SVG root element
            self._validate_svg_root(root, file_errors)
            
            # Check for forbidden elements
            self._check_forbidden_elements(root, file_errors)
            
            # Validate figures with parts
            part_counts = self._validate_figures(root, file_errors, file_warnings)
            
            # Check part uniqueness
            self._validate_part_uniqueness(part_counts, file_errors)
            
            # Report results for this file
            if file_errors:
                print(f"  ❌ ERRORS ({len(file_errors)}):")
                for error in file_errors:
                    print(f"    • {error}")
            
            if file_warnings:
                print(f"  ⚠️  WARNINGS ({len(file_warnings)}):")
                for warning in file_warnings:
                    print(f"    • {warning}")
                    
            if not file_errors and not file_warnings:
                print("  ✅ VALID")
                
            return len(file_errors) == 0
            
        except ET.ParseError as e:
            print(f"  ❌ XML Parse Error: {e}")
            return False
        except Exception as e:
            print(f"  ❌ Unexpected Error: {e}")
            return False
    
    def _validate_filename(self, filename: str, errors: List[str]) -> None:
        """Validate filename follows Unix/Linux conventions."""
        # Check if filename matches valid pattern
        if not self.VALID_FILENAME_PATTERN.match(filename):
            errors.append(f"Invalid filename '{filename}'. Use only letters, numbers, hyphens, underscores, and dots")
            return
        
        # Check for specific problematic patterns
        if ' ' in filename:
            errors.append(f"Filename '{filename}' contains spaces. Use hyphens or underscores instead")
        
        # Check for multiple consecutive dots (except .svg extension)
        name_without_ext = filename.rsplit('.svg', 1)[0]
        if '..' in name_without_ext:
            errors.append(f"Filename '{filename}' contains consecutive dots")
        
        # Check if starts with dot or hyphen
        if filename.startswith('.') or filename.startswith('-'):
            errors.append(f"Filename '{filename}' should not start with dot or hyphen")
        
        # Check if ends with hyphen or underscore (before .svg)
        if name_without_ext.endswith('-') or name_without_ext.endswith('_'):
            errors.append(f"Filename '{filename}' should not end with hyphen or underscore")
        
        # Check for uppercase letters (Unix convention prefers lowercase)
        if any(c.isupper() for c in filename):
            errors.append(f"Filename '{filename}' contains uppercase letters. Unix convention prefers lowercase")
        
        # Check length (255 chars is filesystem limit, but shorter is better)
        if len(filename) > 100:
            errors.append(f"Filename '{filename}' is too long ({len(filename)} chars). Keep under 100 characters")
        
        # Check for special characters that might cause issues
        problematic_chars = set(filename) - set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.-_')
        if problematic_chars:
            errors.append(f"Filename '{filename}' contains problematic characters: {sorted(problematic_chars)}")
    
    def _validate_svg_root(self, root: ET.Element, errors: List[str]) -> None:
        """Validate the SVG root element attributes."""
        if root.tag.split('}')[-1] != 'svg':  # Handle namespaced tags
            errors.append("Root element must be <svg>")
            return
            
        # Check required attributes
        if 'viewBox' not in root.attrib:
            errors.append("SVG missing required 'viewBox' attribute")
        if 'width' not in root.attrib:
            errors.append("SVG missing required 'width' attribute") 
        if 'height' not in root.attrib:
            errors.append("SVG missing required 'height' attribute")
        # Make xmlns optional as it may be inherited
        
        # Check for forbidden attributes (excluding namespaced attributes)
        for attr in root.attrib:
            # Skip namespaced attributes
            if '{' in attr:
                continue
            if attr not in self.ALLOWED_SVG_ATTRIBUTES:
                errors.append(f"SVG has forbidden attribute: '{attr}'")
    
    def _check_forbidden_elements(self, root: ET.Element, errors: List[str]) -> None:
        """Check for forbidden elements like defs and style."""
        # Check for defs
        for elem in root.iter():
            tag = elem.tag.split('}')[-1]  # Handle namespaced tags
            if tag == 'defs':
                errors.append("SVG contains forbidden <defs> element")
            elif tag == 'style':
                errors.append("SVG contains forbidden <style> element")
            elif elem.attrib.get('style'):
                errors.append(f"Element <{tag}> has forbidden 'style' attribute")
    
    def _validate_figures(self, root: ET.Element, errors: List[str], warnings: List[str]) -> Dict[str, int]:
        """Validate figures and their part attributes."""
        part_counts = {}
        
        # Find all elements with part attribute
        for elem in root.iter():
            tag = elem.tag.split('}')[-1]  # Handle namespaced tags
            
            # Skip non-figure elements
            if tag in {'svg', 'title', 'desc', 'metadata', 'text', 'g', 'defs', 'mask', 'use', 'namedview'}:
                continue
                
            part = elem.attrib.get('part')
            if part is None:
                # Only error for actual figure elements (path, rect, circle, etc.)
                if tag in {'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'}:
                    errors.append(f"Figure element <{tag}> missing required 'part' attribute")
                continue
                
            # Validate part value
            if part not in self.VALID_PARTS:
                errors.append(f"Invalid part '{part}' on <{tag}>. Valid parts: {list(self.VALID_PARTS.keys())}")
                continue
                
            # Count part usage
            part_counts[part] = part_counts.get(part, 0) + 1
            
            # Validate fill color
            expected_color = self.VALID_PARTS[part]
            fill_color = elem.attrib.get('fill')
            
            if fill_color != expected_color:
                # Check for common typos
                if part == 'outline' and fill_color in ['blacl', 'black']:
                    if fill_color == 'blacl':
                        errors.append(f"<{tag}> with part='{part}' has typo in fill: '{fill_color}', should be 'black'")
                elif part == 'background' and fill_color in ['lightgray', 'lightgrey', '#C0C0C0']:
                    errors.append(f"<{tag}> with part='{part}' has fill='{fill_color}', expected 'silver'")
                else:
                    errors.append(f"<{tag}> with part='{part}' has fill='{fill_color}', expected '{expected_color}'")
            
            # Validate attributes (only dimensional + fill + part allowed)
            for attr in elem.attrib:
                if attr not in self.DIMENSIONAL_ATTRIBUTES and attr not in {'fill', 'part'}:
                    errors.append(f"<{tag}> has forbidden attribute: '{attr}'")
        
        return part_counts
    
    def auto_fix_file(self, file_path: Path) -> bool:
        """Attempt to auto-fix common issues in an SVG file."""
        try:
            # Read the file content as text for simple replacements
            content = file_path.read_text(encoding='utf-8')
            original_content = content
            
            # Fix common color issues
            fixes = []
            
            # Fix lightgray -> silver
            if 'fill="lightgray"' in content:
                content = content.replace('fill="lightgray"', 'fill="silver"')
                fixes.append("Changed 'lightgray' to 'silver'")
            
            # Fix blacl -> black typo
            if 'fill="blacl"' in content:
                content = content.replace('fill="blacl"', 'fill="black"')
                fixes.append("Fixed typo 'blacl' to 'black'")
                
            # Add xmlns if missing but don't break existing structure
            if 'xmlns=' not in content and '<svg' in content:
                content = content.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"', 1)
                fixes.append("Added missing xmlns attribute")
            
            # Only write if we made changes
            if content != original_content:
                # Backup original file
                backup_path = file_path.with_suffix('.svg.backup')
                file_path.rename(backup_path)
                
                # Write fixed content
                file_path.write_text(content, encoding='utf-8')
                
                print(f"  🔧 AUTO-FIXED: {file_path.name}")
                for fix in fixes:
                    print(f"    • {fix}")
                print(f"    • Backup saved as: {backup_path.name}")
                return True
            
            return False
            
        except Exception as e:
            print(f"  ❌ Auto-fix failed for {file_path.name}: {e}")
            return False
    def _validate_part_uniqueness(self, part_counts: Dict[str, int], errors: List[str]) -> None:
        """Validate that each part appears only once."""
        for part, count in part_counts.items():
            if count > 1:
                errors.append(f"Part '{part}' appears {count} times, should appear only once")
                
    def validate_with_autofix(self, folder_path: str = None) -> bool:
        """Validate files and offer to auto-fix common issues."""
        if folder_path:
            self.folder_path = Path(folder_path)
            
        # First pass - validation
        print("=" * 60)
        print("VALIDATION PASS")
        print("=" * 60)
        
        all_valid = self.validate_all_files()
        
        if all_valid:
            return True
            
        # Identify files that can be auto-fixed
        fixable_files = []
        svg_files = list(self.folder_path.glob("*.svg"))
        
        for svg_file in svg_files:
            content = svg_file.read_text(encoding='utf-8')
            if ('fill="lightgray"' in content or 
                'fill="blacl"' in content or 
                ('xmlns=' not in content and '<svg' in content)):
                fixable_files.append(svg_file)
        
        if fixable_files:
            print("\n" + "=" * 60)
            print("AUTO-FIX SUGGESTIONS")
            print("=" * 60)
            print(f"Found {len(fixable_files)} files with auto-fixable issues:")
            for file in fixable_files:
                print(f"  • {file.name}")
            
            response = input("\nWould you like to auto-fix these files? (y/N): ").strip().lower()
            if response == 'y':
                print("\n" + "=" * 60)
                print("AUTO-FIX PASS")
                print("=" * 60)
                
                for file in fixable_files:
                    self.auto_fix_file(file)
                
                print("\n" + "=" * 60)
                print("RE-VALIDATION AFTER AUTO-FIX")
                print("=" * 60)
                
                return self.validate_all_files()
        
        return False


def main():
    """Main function to run the validator."""
    parser = argparse.ArgumentParser(description='Validate spot illustration SVG files')
    parser.add_argument('folder', nargs='?', default='spot-illustrations', 
                       help='Path to folder containing SVG files (default: spot-illustrations)')
    parser.add_argument('--fix', action='store_true', 
                       help='Offer to auto-fix common issues')
    
    args = parser.parse_args()
    
    validator = SVGValidator(args.folder)
    
    if args.fix:
        success = validator.validate_with_autofix()
    else:
        success = validator.validate_all_files()
    
    print("=" * 60)
    if success:
        print("🎉 All SVG files are valid!")
        sys.exit(0)
    else:
        if not args.fix:
            print("💡 Tip: Run with --fix to attempt automatic fixes for common issues")
        print("❌ Some SVG files have validation errors")
        sys.exit(1)


if __name__ == "__main__":
    main()