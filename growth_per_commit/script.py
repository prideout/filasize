#!/usr/bin/env python3

import os
import re

buildcmd = './build.sh -i release && ./build.sh -vap android -q arm64-v8a release'
cd = 'cd ~/github/filament ; '
aarfile = 'out/filament-android-release.aar'

commits = open('commits_17_to_18.txt').readlines()
outfile = open('commits_17_to_18.json', 'wt')
outfile.write("[\n")

for index, commit in enumerate(commits):

    print(f"{index} / {len(commits)}")

    sha = commit.split(' ')[0]
    desc = commit[len(sha):].strip()

    os.system(f'{cd} git checkout {sha} ; {buildcmd}')

    aarsize = os.popen(f'{cd} ls -l {aarfile}').read()
    aarsize = int(aarsize.split(' ')[7])

    dsosize = os.popen(f'{cd} zipinfo -m {aarfile} | grep -e ".*arm64.*so"  | grep ment-jni').read()
    dsosize = int(dsosize.split(' ')[6])

    result = f"[ \"{sha}\", {aarsize}, {dsosize}, \"{desc}\" ]"
    print(result)

    outfile.write(result + ",\n")

outfile.write("[]]\n")
