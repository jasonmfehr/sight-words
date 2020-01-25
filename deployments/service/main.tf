locals {
  env        = "${terraform.workspace == "default" ? "" : "${terraform.workspace}-"}"
  web_assets = "${path.module}/../../web"
}
