locals {
  env = "${terraform.workspace == "default" ? "" : "${terraform.workspace}-"}"
}
