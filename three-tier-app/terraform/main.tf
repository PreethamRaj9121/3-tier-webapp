
resource "azurerm_resource_group" "rg-block" {
  name = "3-tier-rg"
  location = "East US"
  tags = {
    App ="3 Tier Application"
  }
}

resource "azurerm_container_registry" "acr-block" {
    name = "3tieracr"
    resource_group_name = azurerm_resource_group.rg-block.name
    location = azurerm_resource_group.rg-block.location
    sku = "Basic"
}

resource "azurerm_kubernetes_cluster" "aks-block" {
  name=var.aks_name
  resource_group_name = var.resource_group_name
  location = var.location

  dns_prefix = "${var.aks_name}-dns"

  default_node_pool {
    name = "nodepool"
    node_count = var.node_count
    vm_size = "Standard_B2s"
  }
  
  identity {
    type = "SystemAssigned"
  }
}