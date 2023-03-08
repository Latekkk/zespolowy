Witam moje misie kolorowe.
Odpalanie aplikacji:
vagrant up
później
npm run dev

Stack technologiczny:

#REACT
#TYPESCRIPT
#INERTIA
#VITE
#VAGRANT
#MYSQL


DOCS:
https://laravel.com/docs/10.x/homestead#hostname-resolution
https://pl.reactjs.org/
https://www.typescriptlang.org/
https://legacy.inertiajs.com/
https://vitejs.dev/guide/
https://dev.mysql.com/doc/
php min 8.1
Do zainstalowania

https://www.virtualbox.org/wiki/Downloads
https://developer.hashicorp.com/vagrant/downloads





później

windows jęzeli nie masz klucza wygenerowanego to:
ssh-keygen


linux/macOs nie jestem pewny maca
git clone https://github.com/laravel/homestead.git ~/Homestead
windows
windows git clone https://github.com/laravel/homestead.git C:\Users\latek\Homestead

kopiujemy plik .env.example do .env
kopiujemy plik Homestead.yaml.example do Homestead.yaml
W Homestead.yaml zmienic nazwe folderu na ten co zainstalujemy
- 10 linijka z latek np. na kuba


w C:\Windows\System32\drivers\etc pierw kopiujemy sobie plik hosts następnie edytujemy kopie pliku hosts
i dopisujemy na samym dole 192.168.56.56  zespolowy.test
i bedzie to w dokumentach bo nie mozemy zapisac tam i kasujemy oryginalny  plik nastepnie wklejamy ten nasz  (musi byc bez rozszerzenia)

composer install



Jak mamy już zainstalowane wszystko to puszczamy magiczną komende "vagrant up"
