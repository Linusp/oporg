;; Specify the oporg-docroot or just use current default-directory
;; (setq oporg-docroot (expand-file-name "~/public_org/oporg"))
(setq oporg-docroot default-directory)

;; NOTE: the org-ehtml-docroot value should be fully expanded
(setq org-ehtml-docroot oporg-docroot)
(setq org-todo-keywords
      '((sequence "TODO" "DEV" "READY" "QA" "FAILED" "|" "DONE" "CLOSED")))
(setq org-ehtml-everything-editable t)

;; Start up the web server.
(require 'org-ehtml)
(ws-start org-ehtml-handler 8888)

;; Stop it!
(ws-stop-all)

(message "Default dir: %S" default-directory)
