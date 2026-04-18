MAKEFLAGS += --no-print-directory

.DEFAULT_GOAL := help

.PHONY: help contexto send add status sync

help: ## Mostra os comandos disponíveis
	@echo "Comandos disponíveis:"
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | \
	awk 'BEGIN {FS = ":.*?## "}; {printf "  %-10s %s\n", $$1, $$2}'

contexto: ## Gera o arquivo contexto.txt com repomix
	@echo "Limpando arquivo antigo..."
	@rm -f contexto.txt
	@echo "Gerando novo contexto..."
	@npx --yes repomix --output contexto.txt
	@echo "Pronto!"

send: contexto ## Copia o contexto para o clipboard
	@echo "Copiando para o clipboard..."
	@cat contexto.txt | xclip -selection clipboard
	@echo "Copiado! Agora é só colar."

add: ## Adiciona todas as mudanças do repositório ao stage (via raiz)
	@echo "Indo para a raiz e executando git add..."
	@cd ../../ && $(MAKE) add

status: ## Mostra o status atual do repositório (via raiz)
	@echo "Indo para a raiz e verificando o status..."
	@cd ../../ && $(MAKE) status

sync: ## Sincroniza o repositório (via raiz)
	@echo "Indo para a raiz do repositorio..."
	@cd ../../ && $(MAKE) sync
	@echo "Sincronizacao concluida!"
