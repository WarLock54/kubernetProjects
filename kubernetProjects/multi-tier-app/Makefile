# Makefile - build/push/deploy/delete helpers
REGISTRY ?= docker.io/0nur
FRONTEND_IMAGE = $(REGISTRY)/frontend:latest
API_IMAGE      = $(REGISTRY)/api:latest
KUSTOMIZE      = kubectl apply -k k8s/base

.PHONY: build-frontend build-api push-frontend push-api deploy-all delete-all deploy-frontend deploy-api delete-frontend delete-api

build-frontend:
	docker build -t $(FRONTEND_IMAGE) ./frontend

build-api:
	docker build -t $(API_IMAGE) ./api

push-frontend:
	docker push $(FRONTEND_IMAGE)

push-api:
	docker push $(API_IMAGE)

deploy-all: build-frontend build-api push-frontend push-api deploy-k8s

deploy-k8s:
	kubectl -n multi-tier create namespace multi-tier --dry-run=client -o yaml | kubectl apply -f -
	kubectl apply -k k8s/base

delete-all:
	kubectl delete -k k8s/base || true
	kubectl delete namespace multi-tier || true
