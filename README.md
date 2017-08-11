### Some Test case 

Развернуть кластер из трех виртуальных машин (можно использовать vagrant).

На полученном кластере разместить следующие контейнеры:

  - master-slave кластер из двух нод percona mysql 5.7
  - кластер из двух нод elasticsearch 5.3 без авторизации
  - данный сервис node.js запущенный в 5-и экземплярах

Конфигурация хостов должна осуществляться с помощью системы управления конфигурациями (например, ansible).
Все скрипты и конфигурационные файлы, необходимые для решения задачи нужно вести в git репозитории и выложить его на github или bitbucket.

Доступ к сервису node.js должен осуществляться через reverse-proxy (nginx или HAProxy).
Проверка работы кластера осуществляется через обращение к сервису node.js через http.
 
На этом же кластере организовать сбор логов процессов при помощи logstash и kibana.


### Scheme

#### node1

  - filebeat
  - mysql percona db master
  - nodejs
  - elasticsearch

#### node2

  - filebeat
  - mysql percona db slave
  - nodejs
  - elasticsearch

#### node3

  - filebeat
  - nodejs
  - elasticsearch like balancer
  - logstash
  - kibana
  - HAproxy


