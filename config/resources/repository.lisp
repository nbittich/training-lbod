(in-package :mu-cl-resources)

;;;;
;; NOTE
;; docker-compose stop; docker-compose rm; docker-compose up
;; after altering this file.


;;;;
;; Describe the prefixes which you'll use in the domain file here.
;; This is a short-form which allows you to write, for example,
;; (s-url "http://purl.org/dc/terms/title")
;; as (s-prefix "dct:title")

;; (add-prefix "dct" "http://purl.org/dc/terms/")


;;;;;
;; The following is the commented out version of those used in the
;; commented out domain.lisp.

(add-prefix "dcat" "http://www.w3.org/ns/dcat#")
(add-prefix "dct" "http://purl.org/dc/terms/")
(add-prefix "skos" "http://www.w3.org/2004/02/skos/core#")
(add-prefix "vcard" "http://www.w3.org/2006/vcard/ns#")
(add-prefix "vcard3" "http://www.w3.org/2001/vcard-rdf/3.0#")
(add-prefix "rdf" "http://www.w3.org/1999/02/22-rdf-syntax-ns#")
(add-prefix "time" "http://www.w3.org/2006/time#")
(add-prefix "owl" "http://www.w3.org/2002/07/owl#")
(add-prefix "org" "http://www.w3.org/ns/org#")
(add-prefix "prov" "http://www.w3.org/ns/prov#")
(add-prefix "mu" "http://mu.semte.ch/vocabularies/core/")
(add-prefix "gr" "http://purl.org/goodrelations/v1#")
(add-prefix "foaf" "http://xmlns.com/foaf/0.1/")
(add-prefix "bi" "http://bittich.be/bce/")
(add-prefix "nfo" "http://www.semanticdesktop.org/ontologies/2007/03/22/nfo#")
(add-prefix "nie" "http://www.semanticdesktop.org/ontologies/2007/01/19/nie#")
(add-prefix "dbpedia" "http://dbpedia.org/ontology/")
(add-prefix "rdfs" "http://www.w3.org/2000/01/rdf-schema#")

;;;;;
;; You can use the muext: prefix when you're still searching for
;; the right predicates during development.  This should *not* be
;; used to publish any data under.  It's merely a prefix of which
;; the mu.semte.ch organisation indicates that it will not be used
;; by them and that it shouldn't be used for permanent URIs.

(add-prefix "ext" "http://mu.semte.ch/vocabularies/ext/")
