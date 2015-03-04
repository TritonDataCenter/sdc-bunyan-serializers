#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
#

#
# Copyright (c) 2015, Joyent, Inc.
#

#
# sdc-bunyan-serializers Makefile
#

#
# Tools
#
BUNYAN	:= ./node_modules/bunyan/bin/bunyan
NPM		:= npm

#
# Files
#
JS_FILES	:= $(shell find lib -name '*.js')
JSON_FILES	 = package.json
JSL_CONF_NODE	 = tools/jsl.node.conf
JSL_FILES_NODE	 = $(JS_FILES)
JSSTYLE_FILES	 = $(JS_FILES)
JSSTYLE_FLAGS	 = -f tools/jsstyle.conf

#
# Repo-specific targets
#
.PHONY: all
all: $(BUNYAN)

$(BUNYAN):
	$(NPM) install

include ./tools/mk/Makefile.deps
include ./tools/mk/Makefile.smf.targ
include ./tools/mk/Makefile.targ
