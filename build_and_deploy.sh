#!/bin/sh

rm -rf $PWD/bin/
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -v awscliv2.zip
mkdir $PWD/bin/
./aws/install -b $PWD/bin/
chmod +x $PWD/bin/aws
$PWD/bin/aws --version

export AWS_ACCESS_KEY_ID=${bamboo.AWS_ACCESS_KEY_ID}
export AWS_SECRET_ACCESS_KEY=${bamboo.AWS_SECRET_ACCESS_KEY}
export AWS_SESSION_TOKEN=${bamboo.AWS_SESSION_TOKEN}

#$PWD/bin/aws s3 ls ${bamboo.FCX_UAT_BUCKET}

yarn
yarn build
$PWD/bin/aws s3 sync build ${bamboo.FCX_UAT_BUCKET}