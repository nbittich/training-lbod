(in-package :mu-cl-resources)

;;;;
;; NOTE
;; docker-compose stop; docker-compose rm; docker-compose up
;; after altering this file.

;; Describe your resources here

;; The general structure could be described like this:
;;
;; (define-resource <name-used-in-this-file> ()
;;   :class <class-of-resource-in-triplestore>
;;   :properties `((<json-property-name-one> <type-one> ,<triplestore-relation-one>)
;;                 (<json-property-name-two> <type-two> ,<triplestore-relation-two>>))
;;   :has-many `((<name-of-an-object> :via ,<triplestore-relation-to-objects>
;;                                    :as "<json-relation-property>")
;;               (<name-of-an-object> :via ,<triplestore-relation-from-objects>
;;                                    :inverse t ; follow relation in other direction
;;                                    :as "<json-relation-property>"))
;;   :has-one `((<name-of-an-object :via ,<triplestore-relation-to-object>
;;                                  :as "<json-relation-property>")
;;              (<name-of-an-object :via ,<triplestore-relation-from-object>
;;                                  :as "<json-relation-property>"))
;;   :resource-base (s-url "<string-to-which-uuid-will-be-appended-for-uri-of-new-items-in-triplestore>")
;;   :on-path "<url-path-on-which-this-resource-is-available>")


;; An example setup with a catalog, dataset, themes would be:
;;
;; (define-resource catalog ()
;;   :class (s-prefix "dcat:Catalog")
;;   :properties `((:title :string ,(s-prefix "dct:title")))
;;   :has-many `((dataset :via ,(s-prefix "dcat:dataset")
;;                        :as "datasets"))
;;   :resource-base (s-url "http://webcat.tmp.semte.ch/catalogs/")
;;   :on-path "catalogs")

;; (define-resource dataset ()
;;   :class (s-prefix "dcat:Dataset")
;;   :properties `((:title :string ,(s-prefix "dct:title"))
;;                 (:description :string ,(s-prefix "dct:description")))
;;   :has-one `((catalog :via ,(s-prefix "dcat:dataset")
;;                       :inverse t
;;                       :as "catalog"))
;;   :has-many `((theme :via ,(s-prefix "dcat:theme")
;;                      :as "themes"))
;;   :resource-base (s-url "http://webcat.tmp.tenforce.com/datasets/")
;;   :on-path "datasets")

;; (define-resource distribution ()
;;   :class (s-prefix "dcat:Distribution")
;;   :properties `((:title :string ,(s-prefix "dct:title"))
;;                 (:access-url :url ,(s-prefix "dcat:accessURL")))
;;   :resource-base (s-url "http://webcat.tmp.tenforce.com/distributions/")
;;   :on-path "distributions")

;; (define-resource theme ()
;;   :class (s-prefix "tfdcat:Theme")
;;   :properties `((:pref-label :string ,(s-prefix "skos:prefLabel")))
;;   :has-many `((dataset :via ,(s-prefix "dcat:theme")
;;                        :inverse t
;;                        :as "datasets"))
;;   :resource-base (s-url "http://webcat.tmp.tenforce.com/themes/")
;;   :on-path "themes")

(define-resource individual ()
  :class (s-prefix "vcard:Individual")
  :properties `((:email :string ,(s-prefix "vcard:hasEmail"))
                (:fullname :string ,(s-prefix "vcard:fn"))
                (:nickname :string ,(s-prefix "vcard:nickname")))
  :has-one `((address :via ,(s-prefix "vcard:Home")
                     :inverse t
                     :as "address")
            (telephone :via ,(s-prefix "vcard:Voice")
                     :inverse t
                     :as "telephone"))
  :resource-base (s-url "http://bittich.be/individuals/")
  :on-path "individuals")


(define-resource telephone ()
  :class (s-prefix "vcard:Voice")
  :properties `((:value :string ,(s-prefix "vcard:hasValue")))
  :has-many `((individual :via ,(s-prefix "vcard:Individual")
                         :as "individuals"))
  :resource-base (s-url "http://bittich.be/telephones/")
  :on-path "telephones")

(define-resource address ()
  :class (s-prefix "vcard:Home")
  :properties `((:country :string ,(s-prefix "vcard:country-name"))
                (:locality :string ,(s-prefix "vcard:locality"))
                (:postcode :string ,(s-prefix "vcard:postal-code"))
                (:street :string ,(s-prefix "vcard:street-address")))
  :has-many `((individual :via ,(s-prefix "vcard:Individual")
                         :as "individuals"))
  :resource-base (s-url "http://bittich.be/addresses/")
  :on-path "addresses")

(define-resource code ()
     :class (s-prefix "bi:Code")
     :properties `((:label :language-string-set ,(s-prefix "rdfs:label")))
     :resource-base (s-url "http://bittich.be/bce/code/")
     :features '(include-uri)
     :on-path "codes")

(define-resource company ()
     :class (s-prefix "org:Organization")
     :properties `((:startdate :string ,(s-prefix "bi:hasStartDate"))
                  (:enterpriseNumber :string ,(s-prefix "mu:uuid"))
     )
      :has-one `((code :via ,(s-prefix "bi:hasJuridicalForm")
                       :as "juridicalform")
                (denomination :via ,(s-prefix "org:hasUnit")
                         :inverse t
                         :as "denomination")
                 (code :via ,(s-prefix "bi:hasJuridicalSituation")
                       :as "juridicalsituation")
                 (code :via ,(s-prefix "bi:hasStatus")
                       :as "status")
                 (code :via ,(s-prefix "bi:hasTypeOfCompany")
                       :as "typeofcompany"))
  
     :features '(include-uri)
     :on-path "companies")

(define-resource denomination ()
     :class (s-prefix "bi:Denomination")
     :properties `((:name :language-string-set ,(s-prefix "foaf:name")))
     :resource-base (s-url "http://bittich.be/bce/denomination/")
     :has-one `((company :via ,(s-prefix "org:hasUnit")
                       :as "company")
              )
     :features '(include-uri)
     :on-path "codes")

(defparameter *include-count-in-paginated-responses* t)

