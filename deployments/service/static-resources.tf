resource "aws_s3_bucket" "static_web_resources" {
  bucket = "${local.env}${var.name}-static-resources"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
