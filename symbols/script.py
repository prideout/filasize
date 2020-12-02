#!/usr/bin/env python3

import os
import re

buildcmd = './build.sh -i release && ./build.sh -ap android release'
cd = 'cd ~/github/filament ; '
aarfile = 'out/filament-android-release.aar'

commits = open('commits.txt').readlines()
outfile = open('commits.json', 'wt')
outfile.write("[\n")

for index, commit in enumerate(commits):

    print(f"{index} / {len(commits)}")

    sha = commit.split(' ')[0]
    desc = commit[len(sha):].strip()
    desc = desc.replace('"','')

    os.system(f'{cd} git checkout {sha} ; {buildcmd}')

    aarsize = os.popen(f'{cd} ls -l {aarfile}').read()
    aarsize = int(aarsize.split(' ')[7])

    symbols = os.popen(f'{cd} find . -name libfilament-jni.so | grep stripped | grep filament-android | xargs nm -D | grep UibGenerator').read()
    symbols = symbols.split('\n')[0]

    result = f"[ \"{sha}\", {aarsize}, \"{symbols}\", \"{desc}\" ]"
    print(result)

    outfile.write(result + ",\n")

outfile.write("[]]\n")
