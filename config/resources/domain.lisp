(in-package :mu-cl-resources)
  
;; ============================================================================================================================================
;; TODO PUT IN A SEPARATE FILE
;; BCE API
;; ============================================================================================================================================

(define-resource code ()
     :class (s-prefix "bi:Code")
     :properties `(
          (:label :language-string-set ,(s-prefix "rdfs:label"))
          (:code :string ,(s-prefix "mu:uuid")))
     :resource-base (s-url "http://bittich.be/bce/code/")
     :features '(include-uri)
     :on-path "codes")

(define-resource denomination ()
     :class (s-prefix "bi:Denomination")
     :properties `((:name :language-string-set ,(s-prefix "foaf:name")))
     :resource-base (s-url "http://bittich.be/bce/denomination/")
     :has-one `((company :via ,(s-prefix "bi:denominationBelongsTo")
                       :as "company")
              )
     :features '(include-uri)
     :on-path "denominations")

(define-resource contact ()
     :class (s-prefix "bi:Contact")
     :properties `((:email :string ,(s-prefix "foaf:mbox"))
                  (:phone :string ,(s-prefix "foaf:phone"))
                  (:website :string ,(s-prefix "foaf:homepage")))
     :resource-base (s-url "http://bittich.be/bce/contact/")
     :has-one `((company :via ,(s-prefix "bi:contactBelongsTo")
                       :as "company")
              )
     :features '(include-uri)
     :on-path "contacts")

(define-resource address ()
     :class (s-prefix "bi:Address")
     :properties `((:address :language-string-set ,(s-prefix "vcard3:ADR"))
                   (:zipcode :string ,(s-prefix "vcard3:Pcode")))
     :resource-base (s-url "http://bittich.be/bce/address/")
     :has-one `((company :via ,(s-prefix "bi:addressBelongsTo")
                       :as "company")
                (code :via ,(s-prefix "bi:hasAddressType")
                       :as "addresstype")

              )
     :features '(include-uri)
     :on-path "addresses")

(define-resource file ()
       :class (s-prefix "nfo:FileDataObject")
       :properties `((:name :string ,(s-prefix "nfo:fileName"))
                     (:format :string ,(s-prefix "dct:format"))
                     (:size :number ,(s-prefix "nfo:fileSize"))
                     (:extension :string ,(s-prefix "dbpedia:fileExtension"))
                     (:created :datetime ,(s-prefix "nfo:fileCreated")))
       :has-one `((file :via ,(s-prefix "nie:dataSource")
                     :inverse t
                     :as "download")
                  (company :via ,(s-prefix "bi:hasAttachment")
                     :as "hasattachment")   
                     
                     )
       :resource-base (s-url "http://bittich.be/bce/files/")
       :features `(include-uri)
       :on-path "files")

(define-resource company ()
     :class (s-prefix "org:Organization")
     :properties `((:startdate :string ,(s-prefix "bi:hasStartDate"))
                  (:enterprisenumber :string ,(s-prefix "mu:uuid"))
     )
      :has-many `((file :via ,(s-prefix "bi:hasAttachment")
                       :inverse t
                       :as "attachments"))
      :has-one `((code :via ,(s-prefix "bi:hasJuridicalForm")
                       :as "juridicalform")
                (denomination :via ,(s-prefix "bi:denominationBelongsTo") 
                       :inverse t
                :as "denomination")
                (contact :via ,(s-prefix "bi:contactBelongsTo") 
                       :inverse t
                :as "contact")
                (address :via ,(s-prefix "bi:addressBelongsTo") 
                       :inverse t
                :as "address")
                (code :via ,(s-prefix "bi:hasJuridicalSituation")
                       :as "juridicalsituation")
                (code :via ,(s-prefix "bi:hasStatus")
                       :as "status")
                (code :via ,(s-prefix "bi:hasTypeOfCompany")
                       :as "typeofcompany"))
  
     :features '(include-uri)
     :on-path "companies")

(defparameter *include-count-in-paginated-responses* t)
(defparameter *cache-model-properties-p* t)
(defparameter *cache-count-queries-p* t)
;(defparameter *supply-cache-headers-p* t)

