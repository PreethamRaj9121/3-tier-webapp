output "aks_name" {
  value = azurerm_kubernetes_cluster.aks-block.name
}

output "kube_config" {
  value     = azurerm_kubernetes_cluster.aks-block.kube_config_raw
  sensitive = true
}