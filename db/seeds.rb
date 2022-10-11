# This data can then be loaded with the rails db:seed command (or created alongside the database with db:setup), and reseeded with db:reset

harry = User.create_with(name: "HarryPotter", password: "hedwigrules").find_or_create_by!(email: "harry@hogwarts.com")

ron = User.create_with(name: "RonWeasley", password: "quidditch4life").find_or_create_by!(email: "ron@hogwarts.com")

hermione = User.create_with(name: "HermioneGranger", password: "schoolis4eva").find_or_create_by!(email: "hermione@hogwarts.com")

voldemort = User.create_with(name: "Voldemort", password: "thedarkmark").find_or_create_by!(email: "voldy@deatheaters.com")

bellatrix = User.create_with(name: "BellatrixLestrange", password: "ilovevoldy").find_or_create_by!(email: "bella@deatheaters.com")

Chirp.find_or_create_by!(author: harry, content: "First Chirp! Hi friends!")
Chirp.find_or_create_by!(author: ron, content: "Can't wait for the quidditch world cup!!!!!")
Chirp.find_or_create_by!(author: hermione, content: "I am rather excited for exams, if only @RonWeasley could focus.")
Chirp.find_or_create_by!(author: ron, content: "I'm focusing on the important things in life, @HermioneGranger.")
Chirp.find_or_create_by!(author: bellatrix, content: "Off to do some super secret death eater business!")
Chirp.find_or_create_by!(author: voldemort, content: "Who wants to join my @HarryPotter hunt? 😎")
Chirp.find_or_create_by!(author: harry, content: "Wait, what did @Voldemort just say?")

Follow.find_or_create_by!(friend: harry, follower: ron)
Follow.find_or_create_by!(friend: harry, follower: hermione)
Follow.find_or_create_by!(friend: harry, follower: voldemort)

Follow.find_or_create_by!(friend: ron, follower: harry)
Follow.find_or_create_by!(friend: ron, follower: hermione)

Follow.find_or_create_by!(friend: hermione, follower: harry)
Follow.find_or_create_by!(friend: hermione, follower: ron)

Follow.find_or_create_by!(friend: voldemort, follower: bellatrix)
