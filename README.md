Repository-Level Deployment Structure (Final)

fantasy-app/
│
├── ansible/                     # Infrastructure automation
│   ├── inventory/
│   │   ├── dev.ini
│   │   ├── staging.ini
│   │   └── prod.ini
│   │
│   ├── playbooks/
│   │   ├── bootstrap.yml        # EC2 base setup
│   │   ├── docker.yml           # Docker install
│   │   ├── kubernetes.yml       # K8s setup
│   │   ├── deploy-app.yml       # App deployment
│   │   ├── elk.yml              # Logging stack
│   │   └── monitoring.yml       # Prometheus/Grafana
│   │
│   └── roles/
│       ├── common/
│       ├── docker/
│       ├── kubernetes/
│       ├── jenkins/
│       ├── sonarqube/
│       ├── elk/
│       └── monitoring/
│
├── backend/                     # API services
│   ├── src/
│   ├── Dockerfile
│   └── sonar-project.properties
│
├── frontend/                    # Web / Mobile Web
│   ├── src/
│   └── Dockerfile
│
├── kubernetes/                  # Runtime deployment
│   ├── namespaces.yml
│   ├── backend/
│   │   ├── deployment.yml
│   │   ├── service.yml
│   │   ├── hpa.yml
│   │   └── configmap.yml
│   │
│   ├── frontend/
│   │   ├── deployment.yml
│   │   ├── service.yml
│   │   └── ingress.yml
│   │
│   ├── redis/
│   ├── ingress/
│   └── secrets/
│
├── jenkins/
│   └── Jenkinsfile              # CI/CD pipeline
│
├── scripts/
│   └── one-click-install.sh     # EC2 install trigger
│
├── docker-compose.yml           # Local dev
└── README.md


┌──────────────┐
│   Developer  │
└──────┬───────┘
       ↓
┌──────────────┐
│   GitHub     │  ← Source Code
└──────┬───────┘
       ↓
┌──────────────┐
│   Jenkins    │  ← CI/CD Orchestrator
└──────┬───────┘
       ↓
┌──────────────┐
│ SonarQube    │  ← Code Quality Gate
└──────┬───────┘
       ↓
┌──────────────┐
│   Docker     │  ← Container Build
└──────┬───────┘
       ↓
┌──────────────┐
│   Ansible    │  ← Infra & App Automation
└──────┬───────┘
       ↓
┌──────────────┐
│ Kubernetes   │  ← Runtime Orchestration
└──────┬───────┘
       ↓
┌──────────────┐
│ AWS EC2      │  ← Infrastructure
└──────────────┘


Environment-Wise Deployment Structure

dev      → Small EC2 → 1–2 pods → No autoscale
staging  → Medium EC2 → 2–4 pods → Partial autoscale
prod     → Large EC2 → 5+ pods → Full autoscale

Each environment has:
Separate Ansible inventory
Separate Kubernetes namespace
Separate AWS resources


Namespace: fantasy-prod
│
├── frontend
│   ├── Deployment
│   ├── Service
│   └── Ingress
│
├── backend
│   ├── Deployment
│   ├── Service
│   └── HPA
│
├── cache
│   └── Redis
│
├── logging
│   └── Filebeat
│
└── monitoring
    ├── Prometheus
    └── Grafana


Deployment Flow (Step-by-Step)

1. Developer pushes code → GitHub
2. Jenkins pipeline triggered
3. SonarQube code scan
4. Docker images built & pushed
5. Ansible configures EC2 & K8s
6. Kubernetes deploys new version
7. Traffic routed via Ingress
8. Logs → ELK
9. Metrics → Prometheus/Grafana


Secrets & Config Structure

AWS Secrets Manager
        ↓
Ansible Vault
        ↓
Kubernetes Secrets
        ↓
Application Pods


One-Click EC2 Deployment (Structure-Wise)

User clicks "Install"
↓
EC2 launches
↓
Ansible bootstrap.yml
↓
Docker + Kubernetes setup
↓
App + ELK + Monitoring deployed
↓
Fantasy App LIVE 🎯


✅ What This Structure Gives You

✔ Clean separation of concerns
✔ Easy onboarding for new devs
✔ Safe prod deployments
✔ High scalability (IPL-ready)
✔ DevOps best practices

