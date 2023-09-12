#!/bin/bash
# wait-for-it.sh script pour attendre que des services soient prêts avant de démarrer

# Exemple : attendre que MongoDB soit prêt sur le port 27017
# Usage : wait-for-it.sh host:port [-s] [-t timeout] [-- command args]
# -s : mode strict, échoue si le port n'est pas accessible
# -t TIMEOUT : délai d'attente (en secondes) avant de renoncer (défaut : 15)
# -- COMMAND ARGS : exécute la commande avec les arguments après la fin de l'attente

hostport=$1
shift
cmd="$@"

timeout=15
strict=false
while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    -t)
    timeout="$2"
    shift
    shift
    ;;
    -s)
    strict=true
    shift
    ;;
    --)
    shift
    break
    ;;
    *)
    shift
    ;;
esac
done

start_ts=$(date +%s)
while :
do
    (echo > /dev/tcp/$hostport) >/dev/null 2>&1
    result=$?
    if [[ $result -eq 0 ]]; then
        end_ts=$(date +%s)
        echo "Service $hostport est prêt après $((end_ts - start_ts)) secondes."
        break
    fi
    sleep 1
    current_ts=$(date +%s)
    if [[ $((current_ts - start_ts)) -gt $timeout ]]; then
        echo "Le délai d'attente de $timeout secondes est expiré, le service $hostport n'est pas prêt."
        if $strict; then
            exit 1
        else
            break
        fi
    fi
done

exec $cmd
