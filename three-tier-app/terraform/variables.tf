variable "resource_group_name" {
  type = string
  default = "3-tier-rg"
}

variable "location" {
  type    = string
  default = "East US"
}

variable "aks_name" {
  type    = string
  default = "my-aks-cluster"
}

variable "node_count" {
  type    = number
  default = 1
}
