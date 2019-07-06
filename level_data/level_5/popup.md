## Level 5: Aktienkurse

Der Benutzer klickt in einer in S3 gehosteten Aktien-Web-App auf einen Link um Aktienkurse zu bekommen.
Die App ruft daraufhin eine REST API auf, welche von Amazon API Gateway bereitgestellt wird.
Diese triggert dann eine Lambda-Funktion, welche wiederum die Aktienkurse aus DynamoDB liest und die Daten zurück an den Benutzer schickt.

Abstraktion: Die Aktienkurse liegen schon in DynamoDB und sind aktuell.

Viel Erfolg.
