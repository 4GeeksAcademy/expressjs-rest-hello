FROM gitpod/workspace-postgres

RUN sed -i 's/ServerRoot ${GITPOD_REPO_ROOT}/ServerRoot \/home\/gitpod\/.apache/g' /etc/apache2/apache2.conf
RUN sed -i 's/${GITPOD_REPO_ROOT}\/${APACHE_DOCROOT_IN_REPO}/\/home\/gitpod\/.apache\/public/g' /etc/apache2/apache2.conf
RUN sed -i 's/8001/8008/g' /etc/apache2/apache2.conf

RUN mkdir -p ~/.apache/public/plugins
RUN wget -O ~/.apache/public/adminer-4.7.6-en.php https://github.com/vrana/adminer/releases/download/v4.7.6/adminer-4.7.6-en.php
RUN wget -O ~/.apache/public/plugins/plugin.php https://raw.githubusercontent.com/vrana/adminer/master/plugins/plugin.php

RUN bash -c "echo $'<?php\n\
\n\
function adminer_object() { \n\
  include_once \"./plugins/plugin.php\"; \n\
\n\
  foreach (glob(\"plugins/*.php\") as \$filename) { \n\
      include_once \"./\$filename\"; \n\
  } \n\
\n\
  \$plugins = array( \n\
  ); \n\
\n\
  return new AdminerPlugin(\$plugins); \n\
} \n\
\n\
include \"./adminer-4.7.6-en.php\";' > ~/.apache/public/index.php"

RUN chmod -R u+rwX,go+rX,go-w ~/.apache/public

ENV PATH="$PATH:$HOME/.apache-bin"
RUN mkdir -p ~/.apache-bin \
  && printf "#!/bin/bash\napachectl start" > ~/.apache-bin/apache_start \
  && printf "#!/bin/bash\napachectl stop" > ~/.apache-bin/apache_stop \
  && printf "#!/bin/bash\napachectl restart" > ~/.apache-bin/apache_restart \
  && chmod +x ~/.apache-bin/*

RUN npm i typescript -g

RUN printf "\n# Auto-start Apache2 server.\napache_start > /dev/null\n" >> ~/.bashrc