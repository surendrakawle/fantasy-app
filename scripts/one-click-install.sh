# ansible-playbook -i inventory/prod.ini playbooks/bootstrap.yml
# ansible-playbook -i inventory/prod.ini playbooks/docker.yml
# ansible-playbook -i inventory/prod.ini playbooks/kubernetes.yml
# ansible-playbook -i inventory/prod.ini playbooks/deploy-app.yml


terraform init
terraform apply
