#!/bin/bash
cat ../schema/setup.sql | docker exec -i gameserver_db_1 psql -d db -U user