names = [
   ("JS","Jakob Sønstebø"),
   ("HB","Herman Brunborg"),
   ("JB","Julie Bjørnstad"),
   ("BB","Ben Bjørsvik"),
   ("CF","Carl Fredrik Nordbø Knutsen"),
   ("GJ","Gaute Johannessen"),
   ("ES","Emma Storberg"),
   ("OH","Oskar August Bonafede Heggernes"),
   ("AG","August Gude"),
   ("JH","Junmiao Hu"),
   ("YG","Yasmine Krukkenes-Gomez"),
   ("TD","Trajan Dobrev"),
   ("ME","Marie Engebø"),
   ("ST","Sofie Thelin"),
   ("SS","Sveinung Sandal"),
   ("JW","Jonatan Winsvold"),
]

payload_user = "INSERT INTO User (name) VALUES"
payload_user += ",".join(f" ('{name[1]}')" for name in names)
payload_user += ";"
#  print(payload_user)

rows = []

with open("fees.csv") as f:
    data = f.read().split("\n")[:-1]

for row in data:
    amount, short_name, comment = row.split(";")

    name = ""
    for sn, n in names:
        if sn == short_name:
            name = n
            break
    if name == "":
        print("Name not found for", short_name)
        exit()

    #  print(amount, name, comment)
    rows.append(
    f"('{comment}', {amount}, (SELECT id FROM User WHERE name = '{name}'), 'admin', CURRENT_TIMESTAMP)"
            )
#  sql_fee = "INSERT INTO Fee (comment, amount, userId, addedBy) VALUES" + ",".join(rows) + ";"
sql_fee ="INSERT INTO Fee (comment, amount, userId, addedBy, updatedAt) VALUES " + ",".join(rows) + ";"
print(sql_fee)
