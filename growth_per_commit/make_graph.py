#!/usr/bin/env python3

import json
import matplotlib.pyplot as plt

aarsizes = []
dsosizes = []
commits = []

rows = list(json.load(open('commits_17_to_18.json')))
rows.reverse()

index = 0
previous = 0
maxdelta = 0
maxindex = 0

for commit in rows:
    if not commit:
        continue
    sha, aarsize, dsosize, desc = commit
    aarsize /= 1024.0
    dsosize /= 1024.0
    aarsizes.append(aarsize)
    dsosizes.append(dsosize)
    commits.append(sha)
    print(f"{aarsize:3.1f} {dsosize:3.1f} {sha} {desc}")
    delta = aarsize - previous
    if index > 0 and delta > maxdelta:
        maxdelta = delta
        maxindex = index
    previous = aarsize
    index += 1

ax = plt.gca()
plt.title('Filament Size from 1.7.0 to 1.8.0')
plt.ylabel('KiB')

tickvals = [0, maxindex, len(commits) - 1]
tickshas = [commits[i] for i in tickvals]
plt.xticks(tickvals, tickshas, rotation=45)
ax.vlines([maxindex], 0, 1, transform=ax.get_xaxis_transform(), colors='r')

if True:
    ax.set_ylim([475,575])
    plt.plot(aarsizes, label='filament-android-release.aar')
else:
    ax.set_ylim([800,1024])
    plt.plot(dsosizes, label='libfilament-jni.so')

plt.subplots_adjust(bottom=0.2)
plt.legend()
plt.show()
plt.close()
