Witam moje misie kolorowe.

Stack technologiczny:

#REACT
#TYPESCRIPT
#INERTIA
#VITE
#VAGRANT
#MYSQL

Najnowszy php min 8.1
Do zainstalowania

https://www.virtualbox.org/wiki/Downloads
https://developer.hashicorp.com/vagrant/downloads


docsy https://laravel.com/docs/10.x/homestead#hostname-resolution
później
linux/macOs nie jestem pewny maca
git clone https://github.com/laravel/homestead.git ~/Homestead
windows
windows git clone https://github.com/laravel/homestead.git C:\Users\latek\Homestead

W Homestead.yaml zmienic nazwe folderu na ten co zainstalujemy
- 10 linijka z latek np. na kuba


w C:\Windows\System32\drivers\etc pierw kopiujemy sobie plik hosts następnie edytujemy kopie pliku hosts
i dopisujemy na samym dole 192.168.56.56  zespolowy.test
i bedzie to w dokumentach bo nie mozemy zapisac tam i kasujemy oryginalny  plik nastepnie wklejamy ten nasz  (musi byc bez rozszerzenia)

composer install
Jak mamy już zainstalowane wszystko to puszczamy magiczną komende "vagrant up"
