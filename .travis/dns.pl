#!/usr/bin/perl

# Generate DNS name for deployment

my $domainname = $ARGV[0];
my $fullname = $ARGV[1];
my $hostname_length = 64 - length($domainname);

# Known branch prefixes
my @branch_prefixes = ("feature");

if (hostname_length lt 5) {
  print "Less than 5 characters to DNS name please find a more appropriate subdomain\n";
  exit -1;
}

my $hostname = $fullname;
foreach my $prefix (@branch_prefixes) {
  $hostname =~ s/$prefix//;
}
$hostname =~ s/--/-/;
$hostname = substr($hostname, 0, $hostname_length);
$hostname =~ s/-$//;

print $hostname;