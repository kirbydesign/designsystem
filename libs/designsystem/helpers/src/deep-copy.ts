/*
Copied from https://github.com/ykdr8/ts-deepcopy.

MIT License

Copyright (c) 2017 ykdr2017

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */
export function deepCopy<Tp>(tgt: Tp): Tp {
  let cp: Tp;
  if (tgt === null) {
    cp = tgt;
  } else if (tgt instanceof Date) {
    cp = new Date((tgt as any).getTime()) as any;
  } else if (Array.isArray(tgt)) {
    cp = [] as any;
    (tgt as any[]).forEach((v) => {
      (cp as any).push(v);
    });
    cp = (cp as any).map((n: any) => deepCopy<any>(n));
  } else if (typeof tgt === 'object') {
    cp = { ...(tgt as Tp) } as Tp;
    Object.keys(cp).forEach((k) => {
      (cp as any)[k] = deepCopy<any>((cp as any)[k]);
    });
  } else {
    cp = tgt;
  }
  return cp;
}
