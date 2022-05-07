# SMART EDU

## KURULUM VE BAŞLATMA
Github sayfasından projeyi indirin ve istediğiniz bir klasöre çıakrtın. Daha sonra çıkarttığınız dizini kod editörü ile açın. Varsa editörün terminal ekranınına yoksa işletim sistemin kout ekranına aşağıdaki kodu yazın
```console 
npm install
```
bu kod uygulamaay bağımlı olan modulleri indirecek.

şimdi sıra uyhgulamayı çalıştırıalım cyine komut satırı ekranına şu komutu yazalım

```console
node app.js
```
bunu yazdıktan sonra uygulama 3000 nolu port'ta başlamış olacak.

## UYGULAMA ÖZELLİKELRİ

### 1. **üyelik sistemi**
  - öğrenci 
  - öğretmen
  - admin

### 2. **Dashboard Sistemi**

- *Öğretmenler için*
  - Kurs Ekleme 
  - Kurs Silme
  - Kurs Güncelleme

- *Öğrenciler için*
  - Kurs'a başlama 
  - Kurs'u bırakma

- *Adminler için*
  - Kullanıcıları görüntüleme
  - Kullanıcı ekleme
  - Kullanıcı düzenleme
  - Kullanıcı silme
  - Kategorileri görüntüleme
  - Kategori ekleme
  - Kategori düzenleme
  - Kategori silme

## SAYFALAR

### ANASAYFA
  
bu safada en son eklenen 2 kursu görebiliri<. Aşağı indiğimizde ise toplam öğrenci saysı, toplam öğretme nsaysııs ve toplam kurs sayısını görebiliriz. Ayrıca kursu incele dediğimizde kursun tekil sayfasıana gideriz. 

![index page](https://i.ibb.co/2sm4mW5/zyro-image.png)  

### GİRİŞ SAYFASI
Sitenin tüm özelliklerini kullanmanız için giriş yapmanız gerkiyor meselaöğrenci olarak giriş yaparsanız panel sayfanız öğrenciler için şekillenecektir, veya teacher yada öğretmen olarak girş yaparsanız da girdiğiniz rol iiçin şekillenecektir.  

Eğer giriş işleminde hata oluştuysa mesela email ve şifre alanını boş bırakınca boş bıraktığınızı söyler. Eğer email doğru ama şifre yanlış ise size parolanızın hatalı olduğunu söyler
![loginError](https://i.ibb.co/zsw35wH/Web-yakalama-7-5-2022-145556-localhost.jpg)

### KURSLAR  

Bu sayfa var olan kursları inceleyebilirsin. Kursları kategorilere göre veya çubuğunda arama yaparak filtreleyebilrsin. Kursların atında hangi öğretmen tarafından oluşturulduğunu görebilir ve kursa tıklarsan kursun tekil sayfasına gidebilirsin. Kurs tekil sayfasında kurs hakkında daha fazla bilgiye ulaşacaksın.  Kurslar sayfası öğrenci, öğretmen ve admin sayfası için aynı.

![course page](https://i.ibb.co/DYVfZJn/zyro-image-1.png)

### KURS TEKİL SAYFASI

Her kursun kendine ait sayfası var. Bu sayfa kursun adı, kursun açıklaması, kursun resimi, kursu oluşturan öğretmenin adı ve kurs kategorisi. 