#!/bin/sh
set -e
# Sanitize CSP_NONCE: alphanumeric only
export CSP_NONCE=$(echo "$CSP_NONCE" | sed 's/[^a-zA-Z0-9]//g')
envsubst '$CSP_NONCE' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/nginx.conf
exec nginx -g 'daemon off;'