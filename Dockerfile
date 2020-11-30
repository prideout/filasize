# Build the image:
#   docker build --no-cache --tag filasize .
#
# Run the image and mount the current directory:
#   docker run -it -v `pwd`:/trees -t filasize
#
# Type the following commands into your shell:
#   export BLOATPY=`pwd`/bloat/bloat.py
#   export TARGET=libfilament-jni.so
#   cd docs/v1.9.10
#   nm -C -S -l $TARGET > $DIR/nm.out
#   objdump -h $TARGET > $DIR/objdump.out
#   $BLOATPY syms > bloat.json

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
	python3

RUN set -eux ;\
    update-alternatives --install /usr/bin/clang clang /usr/bin/clang-7 100 ;\
    update-alternatives --install /usr/bin/clang++ clang++ /usr/bin/clang++-7 100 ;\
    update-alternatives --install /usr/bin/cc cc /usr/bin/clang 100 ;\
    update-alternatives --install /usr/bin/c++ c++ /usr/bin/clang++ 100

RUN curl -sL https://deb.nodesource.com/setup_15.x | bash -
RUN apt-get install -y nodejs
