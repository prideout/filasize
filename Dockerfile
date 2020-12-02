# Build the image:
#   docker build --tag filasize .
#
# Run the image and mount the current directory:
#   docker run -it -v `pwd`:/trees -t filasize
#
# Type the following commands into your shell:
#   cd docs/release_v1.4.5
#   nm -C -S -l -D $TARGET > nm.out
#   objdump -h $TARGET > objdump.out
#   $BLOATPY syms > bloat.json
#   cp ../../index.html .

FROM ubuntu:focal
WORKDIR /trees
ARG DEBIAN_FRONTEND=noninteractive
ENV CXXFLAGS='-fno-builtin -Wno-pass-failed'

RUN apt-get update && \
    apt-get --no-install-recommends install -y \
	apt-transport-https \
	apt-utils \
	build-essential \
	clang-7 \
	libc++-7-dev \
	libc++abi-7-dev \
	python \
	python3 \
	curl \
	gnupg2

RUN set -eux ;\
    update-alternatives --install /usr/bin/clang clang /usr/bin/clang-7 100 ;\
    update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-7 100 ;\
    update-alternatives --install /usr/bin/cc cc /usr/bin/clang 100 ;\
    update-alternatives --install /usr/bin/c++ c++ /usr/bin/clang++ 100

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install -y yarn
RUN yarn global add webtreemap
RUN yarn global add typescript

ENV BLOATPY=/trees/bloat/bloat.py
ENV TARGET=libfilament-jni.so
