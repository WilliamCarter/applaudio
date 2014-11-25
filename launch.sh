# Launch Applaudio as production application (sbt dist)

applaudio_base_path="$PWD"

if [ $# -gt 0 ]
then
	applaudio_base_path="$1"

	echo "Application base path: $applaudio_base_path"

    echo "Editing nginx configuration"
    sed -i.bak s/__APPLAUDIO_BASE_PATH__/$applaudio_base_path/g conf/server/nginx.conf
fi

echo "Starting Nginx"
nginx -c "$applaudio_base_path/conf/server/nginx.conf"


if [ $# -gt 1 ]
then
    library_path="$2"

    echo "Library path: $library_path"

    if [ ! -e "$library_path" ]
    then
        echo "Creating library folders"
        mkdir -p "$library_path"
    fi

    echo "Updating Play! configuration with library path"
    sed -i.bak s/^library.root=.*/library.root=\"$library_path\"/g conf/application.conf
fi

# Start Play service
bin/applaudio -mem 256 -Dconfig.file="$applaudio_base_path/conf/application.conf" -Dhttp.port=9000
