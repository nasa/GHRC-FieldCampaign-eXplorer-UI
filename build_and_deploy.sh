#!/bin/bash

set -e  # Abort script if any command fails

export AWS_REGION="$bamboo_AWS_REGION"
export AWS_ACCESS_KEY_ID="$bamboo_SVC_AWS_PROD_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="$bamboo_SVC_AWS_PROD_SECRET_ACCESS_KEY"

# Check if AWS credentials are valid
aws sts get-caller-identity >/dev/null

# Build the Docker image
docker build . -t fcx

# Create a unique container ID
CID=$(docker create fcx)

# Copy the build artifacts from the Docker container to the local "dist" directory
docker cp "${CID}":app/build ./dist

# Clean up the Docker container
docker rm "${CID}"

# Validate AWS S3 connectivity
aws s3 ls >/dev/null

# # Move the contents of the "fcx" directory in the S3 bucket to a backup directory
# aws s3 mv s3://ghrc-web-services/fcx s3://ghrc-web-services-backup/fcx --recursive

# # Sync the local "dist" directory to the "fcx" directory in the S3 bucket
# aws s3 sync ./dist s3://ghrc-web-services/fcx

# Cleanup the "dist" directory
rm -rf ./dist

echo "Deployment completed successfully."




































# #!/bin/sh

# rm -rf $PWD/bin/
# curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
# unzip -v awscliv2.zip
# mkdir $PWD/bin/
# ./aws/install -b $PWD/bin/
# chmod +x $PWD/bin/aws
# $PWD/bin/aws --version

# export AWS_ACCESS_KEY_ID=${bamboo.AWS_ACCESS_KEY_ID}
# export AWS_SECRET_ACCESS_KEY=${bamboo.AWS_SECRET_ACCESS_KEY}
# export AWS_SESSION_TOKEN=${bamboo.AWS_SESSION_TOKEN}

# #$PWD/bin/aws s3 ls ${bamboo.FCX_UAT_BUCKET}

# yarn
# yarn build
# $PWD/bin/aws s3 sync build ${bamboo.FCX_UAT_BUCKET}
