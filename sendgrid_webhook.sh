function localtunnel {
  lt -s 24i24jkn --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done
