resource "aws_s3_bucket" "static_web_resources" {
  bucket = "${local.env}${var.name}-static-resources"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket_object" "html_index" {
  bucket       = aws_s3_bucket.static_web_resources.bucket
  key          = "index.html"
  content      = file("${local.web_assets}/html/index.html")
  acl          = "public-read"
  content_type = "text/html"
}

resource "aws_s3_bucket_object" "stylesheets" {
  for_each = fileset("${local.web_assets}/stylesheets", "**/*.css")

  bucket       = aws_s3_bucket.static_web_resources.bucket
  key          = "stylesheets/${each.value}"
  content      = file("${local.web_assets}/stylesheets/${each.value}")
  acl          = "public-read"
  content_type = "text/css"
}

resource "aws_s3_bucket_object" "js" {
  for_each = fileset("${local.web_assets}/js", "**/*.js")

  bucket       = aws_s3_bucket.static_web_resources.bucket
  key          = "js/${each.value}"
  content      = file("${local.web_assets}/js/${each.value}")
  acl          = "public-read"
  content_type = "text/javascript"
}