terraform {
  backend "s3" {
    bucket = "sightwords-tf-backend"
    key    = "service"
    region = "us-west-2"
  }
}