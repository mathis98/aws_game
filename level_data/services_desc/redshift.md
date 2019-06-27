## Redshift

Redshift kann Queries direkt auf einen S3 Data Lake
ausführen. Das heisst, dass die Daten nicht erneut
geladen werden müssen, welches Zeit, Speicherplatz,
und deshalb auch Geld, spart. Weil Datensätze in S3
Buckets als einzelne Dateien gespeichert werden (in
Formaten wie JSON, CSV, Parquet, etc.), kann Redshift
datensatzübergreifende Queries in place ausführen.

[Mehr Infos](https://aws.amazon.com/redshift/)