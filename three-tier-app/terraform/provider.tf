terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "4.3.0"
    }
  }
}


provider "azurerm" {
  features {}
  subscription_id = "7090ed38-5260-4a48-b0b6-b983c88820be"
  resource_provider_registrations = "none"
}


