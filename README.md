# openai-slack-bot

発言にchatgptで返信してくれるだけのslack botです。

## セットアップ

### mrsk のインストール

```
$ gem install mrsk
```

### .env の作成

```
--
SLACK_SIGNING_SECRET=<slackの管理画面から取得した値>
SLACK_BOT_TOKEN=<slackの管理画面から取得した値>
OPENAI_API_KEY=<openaiの管理画面から取得した値>
MRSK_REGISTRY_PASSWORD=<dockerレジストリのパスワード>
```

### config/deploy.yml の作成

```
# Name of your application. Used to uniquely configure containers.
service: openai-slack-bot

# Name of the container image.
image: user/my-app

# Deploy to these servers.
servers:
  - 192.168.0.1 

# Credentials for your image host.
registry:
  # Specify the registry server, if you're not using Docker Hub
  # server: registry.digitalocean.com / ghcr.io / ...
  username: fukata 
  password:
    - MRSK_REGISTRY_PASSWORD

env:
  secret:
    - SLACK_SIGNING_SECRET
    - SLACK_BOT_TOKEN
    - OPENAI_API_KEY

healthcheck:
  path: /up
  port: 3000

```

## デプロイ

```
mrsk deploy
```
