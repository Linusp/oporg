;; Specify the oporg-docroot or just use current default-directory
;(setq oporg-docroot (expand-file-name "~/Dev/org-mode/org-html-themes/demo"))
(setq oporg-docroot default-directory)

;; NOTE: the org-ehtml-docroot value should be fully expanded
(require 'org-ehtml)
(setq org-ehtml-docroot oporg-docroot)
(setq org-todo-keywords
      '((sequence "TODO" "DEV" "READY" "QA" "FAILED" "|" "DONE" "CLOSED")))
(setq org-ehtml-everything-editable t)

;; Start up the web server.
(ws-start org-ehtml-handler 8888)

;; Stop it! do: `M-x ws-stop-all RET' or evaluate the following:
;; (ws-stop-all)
