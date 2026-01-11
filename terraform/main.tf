provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "fantasy" {
  ami           = "ami-0f5ee92e2d63afc18"
  instance_type = "t3.large"
}
