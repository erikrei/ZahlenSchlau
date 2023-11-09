# ZahlenSchlau

Das Projekt dient dazu eine Web-Applikation <b>ZahlenSchlau</b> zu erstellen, um die React-Kenntnisse anzuwenden. 

<b>ZahlenSchlau</b> ist eine Web-Applikation, in der mathematische Aufgaben gestellt werden und in der man individuelle Aufgaben erstellen kann.
Hauptsächlich geht es hierbei um kleinere Kinder, die durch die Interaktion mit dem Computer vielleicht mehr Lust haben mathematische Aufgaben zu lösen.

Erstmals muss die Applikation mit `git clone https://github.com/erikrei/ZahlenSchlau_react.git` auf dem lokalen Computer gespeichert werden. 

Bevor man die Docker Container startet, muss im `ZahlenSchlau_react/backend`-Verzeichnis einmal `npm install` ausgeführt werden. 

Wenn man sich im Verzeichnis des Projekts befindet wird das Projekt in Docker Containern gestartet, indem man `docker compose up --build` ausführt.

Wenn man auf Linux folgedene Fehlermeldung erhält `WARNING: MongoDB 5.0+ requires a CPU with AVX support, and your current system does not appear to have that!` sollte das Image in `compose.yaml` von db auf `image: mongo:4.4.22` geändert werden. 

Die Bilder auf der Seite wurden von folgenden Künstlern erstellt:
- <a href="https://pixabay.com/de/users/pexels-2286921/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1866497">Pexels</a> auf <a href="https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1866497">Pixabay</a>
- <a href="https://pixabay.com/de/users/pixapopz-2873171/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1547018">Chuk Yong</a> auf <a href="https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1547018">Pixabay</a>
- <a href="https://pixabay.com/de/users/shutterbug75-2077322/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1238598">Robert Owen-Wahl</a> auf <a href="https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1238598">Pixabay</a>
- <a href="https://pixabay.com/de/users/_alicja_-5975425/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4014181">Alicja</a> auf <a href="https://pixabay.com/de//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=4014181">Pixabay</a>
