<%@ page import="java.sql.*,
				java.io.*"%>

<%
	String fn = request.getParameter("name");
	String[] answers = request.getParameterValues("ans[]");

	String tid = request.getParameter("tid");
    
System.out.println(fn+"   "+tid+"   "+answers);
    
    if(answers==null){
        answers = new String[100];
        for(int i=0;i<100;i++){
            answers[i] = " ";
        }
        tid = "1";
        fn="test";
    }else{
        for(int i=0;i<answers.length;i++){
            System.out.println("ANSWERS---"+i+"  :  "+answers[i]);
        }
    
    }
System.out.println("answers ll : "+answers.length);
	
	String[] answersheet1 = {
			"Listening-Part1-Question1 : Jack was once a student in Winnipeg.",
        	"Listening-Part1-Question2 : I'm fixing the car now.",
 	       	"Listening-Part1-Question3 : Sam won't be home for a while.",
	        "Listening-Part1-Question4 : Phil missed the end of the movie.",
 	       	"Listening-Part1-Question5 : Wendy was promoted.",
 	       	"Listening-Part1-Question6 : You decide when to pay.",
	        "Listening-Part1-Question7 : I need to postpone my trip.",
	        "Listening-Part1-Question8 : Lately, Jacob works very little.",
	        "Listening-Part2-Question1 : You should probably get a taxi from here.",
	        "Listening-Part2-Question2 : It was pretty dull if you ask me.",
	        "Listening-Part2-Question3 : Quite a bit since it's high season.",
 	       	"Listening-Part2-Question4 : I'm looking for the manager.",
       		"Listening-Part2-Question5 : She was out of town.", 
  	      	"Listening-Part2-Question6 : I think your old one will do just fine.",
  	      	"Listening-Part2-Question7 : It's about halfway done.",
  	      	"Listening-Part2-Question8 : There are many positions advertised.", 
            "Listening-Part3-Question1 : to change her hair colour",
	        "Listening-Part3-Question2 : Her visit will take a full hour.",
	        "Listening-Part3-Question3 : 1:30 p.m.",
 	       	"Listening-Part3-Question4 : She is cautious.",
       		"Listening-Part3-Question5 : whether to change the hairstyle",
  	      	"Listening-Part3-Question6 : impressed",
  	      	"Listening-Part3-Question7 : Protect the colour with a special product.",
  	      	"Listening-Part3-Question8 : She now has more confidence in his abilities.",
			"Listening-Part4-Question1 : He missed an interview opportunity.", 
        	"Listening-Part4-Question2 : She had a family emergency.", 
        	"Listening-Part4-Question3 : She only meets journalists face to face.",
        	"Listening-Part4-Question4 : Try to interview the artist while she's in New York.",
        	"Listening-Part4-Question5 : Fill in for her for five days.",
        	"Listening-Part5-Question1 : Slugs have attacked part of her vegetable garden.",
        	"Listening-Part5-Question2 : There has been an excessive amount of rain.",
        	"Listening-Part5-Question3 : They make the environment unpleasant for slugs.",
        	"Listening-Part5-Question4 : The pests cannot cross over the coils.", 
        	"Listening-Part5-Question5 : The woman can use 1 cent coins.",
        	"Listening-Part5-Question6 : To purchase an item that is currently out of stock.",
        	"Listening-Part6-Question1 : it jumped onto him.",
        	"Listening-Part6-Question2 : was part of a research project.",
        	"Listening-Part6-Question3 : is studying animal language.",
        	"Listening-Part6-Question4 : stayed at Henry Lang's house for a couple of days.",
        	"Listening-Part6-Question5 : now teaches the parrot opera singing.",
            "Listening-Part7-Question1 : Birds are ruining school property.",
	        "Listening-Part7-Question2 : He has a brother or sister.",
	        "Listening-Part7-Question3 : It lacks sufficient operating funds.",
 	       	"Listening-Part7-Question4 : Shooting wildlife is prohibited by local bylaws.",
       		"Listening-Part7-Question5 : It serves as food in some regions.",
  	      	"Listening-Part7-Question6 : They take too long to arrive.",
  	      	"Listening-Part7-Question7 : They are not aware of the program.",
  	      	"Listening-Part7-Question8 : ask the parents to help out",
        	"Listening-Part8-Question1 : has received a lot of opposition.",
        	"Listening-Part8-Question2 : lead to the growth of toxic organisms in the sea.",
        	"Listening-Part8-Question3 : competition between farmed and native species.",
        	"Listening-Part8-Question4 : positively impacts bird and dolphin populations.", 
        	"Listening-Part8-Question5 : contain organisms that can be harmful for humans.",
        	"Listening-Part8-Question6 : marketing maneuvers to dissuade consumption of farmed fish.",
        	"Reading-Part-1-Q1 : purchased a large property.", 	
			"Reading-Part-1-Q2 : the building was being sold.",  	
			"Reading-Part-1-Q3 : she can get around town easily.",	
			"Reading-Part-1-Q4 : sold paintings in a fundraising event.", 	
			"Reading-Part-1-Q5 : a list of art pieces that were sold went missing.",
			"Reading-Part-1-Q6 : got a new job.",
			"Reading-Part-1-Q7 : quite dark.",
			"Reading-Part-1-Q8 : an artist,",
			"Reading-Part-1-Q9 : on the coast.",
			"Reading-Part-1-Q10 : misunderstanding after the art show.",
			"Reading-Part-1-Q11 : stop painting full-time.",
			"Reading-Part-2-Q1 : is over thirteen years old now,",
			"Reading-Part-2-Q2 : but it still doesn’t pay to",
			"Reading-Part-2-Q3 : get the night pass.",
			"Reading-Part-2-Q4 : can snowboard",
			"Reading-Part-2-Q5 : Billy wants free ski lessons",
			"Reading-Part-2-Q6 : co-worker.",
			"Reading-Part-2-Q7 : is an experienced skier.",
			"Reading-Part-2-Q8 : saves money for a full pass.",
			"Reading-Part-3-Q1 : E",
			"Reading-Part-3-Q2 : D",
			"Reading-Part-3-Q3 : C",
			"Reading-Part-3-Q4 : B",
			"Reading-Part-3-Q5 : E",
			"Reading-Part-3-Q6 : A",
			"Reading-Part-3-Q7 : C",
			"Reading-Part-3-Q8 : D",
			"Reading-Part-3-Q9 : B",
			"Reading-Part-4-Q1 : attract more customers to clients’ companies.",
			"Reading-Part-4-Q2 : They avoid having their personal life consumed by work.",
			"Reading-Part-4-Q3 : develop balanced, profitable and stable companies.",
			"Reading-Part-4-Q4 : companies that don’t expand may go bust in a downturn.",
			"Reading-Part-4-Q5 : businesses must continually expand to survive.",
			"Reading-Part-4-Q6 : lose all her clients",
			"Reading-Part-4-Q7 : any form of growth whatsoever.",
			"Reading-Part-4-Q8 : a low-stress lifestyle,",
			"Reading-Part-4-Q9 : make business the priority.",
			"Reading-Part-4-Q10 : strive for growth."};
		
	String[] answersheet2 = {
			"Listening-Part1-Question1 : Matt and his brother like each other.",
			"Listening-Part1-Question2 : She never finishes her work on time. ",
			"Listening-Part1-Question3 : I will likely be in touch with Jacob soon.",
			"Listening-Part1-Question4 : Justin is always late for class. ",
			"Listening-Part1-Question5 : I wasn’t able to see the show. ",
			"Listening-Part1-Question6 : We recently met. ",
			"Listening-Part1-Question7 : I’m reconsidering traveling in July. ",
			"Listening-Part1-Question8 : Medical attention is not necessary. ", 
			"Listening-Part2-Question1 : Yes, he does work long hours.",
			"Listening-Part2-Question2 : Yes, you can put it right over there. ", 
			"Listening-Part2-Question3 : It’s just around the corner.",
			"Listening-Part2-Question4 : Our meetings are very productive.", 
			"Listening-Part2-Question5 : I’m usually up early on Mondays.", 
			"Listening-Part2-Question6 : I expect that I’ll be back next week. ",
			"Listening-Part2-Question7 : I get it done on the weekends. ",
			"Listening-Part2-Question8 : My manager showed me how it works.", 
			"Listening-Part4-Question1 : A day.", 
			"Listening-Part4-Question2 : She got embarrassed and ran off. ", 
			"Listening-Part4-Question3 : Because he may not be able to attend the opera.",
			"Listening-Part4-Question4 : By offering a complimentary dessert. ",
			"Listening-Part4-Question5 : Require the waitress to practice. ",
			"Listening-Part5-Question1 : To claim a gift from his grandson. ",
			"Listening-Part5-Question2 : Painting rural landscapes from his childhood.",
			"Listening-Part5-Question3 : Because it is too difficult for first-time painters.",
			"Listening-Part5-Question4 : It has a much quicker drying time. ", 
			"Listening-Part5-Question5 : Because the man could get assistance. ",
			"Listening-Part5-Question6 : Try to learn painting by himself. ",
			"Listening-Part6-Question1 : a large bird flew into his windshield.",
			"Listening-Part6-Question2 : in a protected area. ",
			"Listening-Part6-Question3 : the bird to die. ",
			"Listening-Part6-Question4 : cooked the animal they had hit. ",
			"Listening-Part6-Question5 : a survival course she had taken.",
			"Listening-Part8-Question1 : unanimous support from students and teachers. ",
			"Listening-Part8-Question2 : is being considered as a country-wide policy in Canada. ",
			"Listening-Part8-Question3 : help students focus on academics, not fashion. ",
			"Listening-Part8-Question4 : is not always culturally sensitive.", 
			"Listening-Part8-Question5 : some flexibility to the enforcement of uniform rules.",
			"Listening-Part8-Question6 : provide students with a clear dress code to be applied to regular clothes.",
			"Reading-Part-1-Q1 : got a new tent in the mail. ", 	
			"Reading-Part-1-Q2 : were surprised by the water level at the lake.",  	
			"Reading-Part-1-Q3 : his grandpa still owns a shop there.",	
			"Reading-Part-1-Q4 : he saw something that belonged to his grandfather.", 	
			"Reading-Part-1Q5 : travel to Montreal very soon. ",	
			"Reading-Part-1Q6 : used to go camping with Greg. ", 	
			"Reading-Part-1Q7 : see you here.",	
			"Reading-Part-1Q8 : camping is a great idea,",	
			"Reading-Part-1Q9 : spend your own money on a ticket;",	
			"Reading-Part-1Q10 : the old store sign?",	
			"Reading-Part-1Q11 : didn’t find the old house.", 				
			"Reading-Part-2Q1 : some after school activities for your kids.",	
			"Reading-Part-2Q2 : A1 Math and Chess",	
			"Reading-Part-2Q3 : the hellomath.ca website.",	
			"Reading-Part-2Q4 : training in the week and a weekend game.",	
			"Reading-Part-2Q5 : there’s no website.",	
			"Reading-Part-2Q6 : now live in the same area.", 	
			"Reading-Part-2Q7 : is suggesting activities in the neighbourhood. ",	
			"Reading-Part-2Q8 : doesn’t enjoy math as much as Alex.",				
			"Reading-Part-3Q1 : C", 	
			"Reading-Part-3Q2 : E", 	
			"Reading-Part-3Q3 : B", 	
			"Reading-Part-3Q4 : E", 	
			"Reading-Part-3Q5 : B", 	
			"Reading-Part-3Q6 : D", 	
			"Reading-Part-3Q7 : C", 	
			"Reading-Part-3Q8 : A", 	
			"Reading-Part-3Q9 : B", 				
			"Reading-Part-4Q1 : challenge well established educational publications.", 	
			"Reading-Part-4Q2 : they promote low-standard research with no scientific credibility.", 	
			"Reading-Part-4Q3 : she observes that historically the earth’s temperature has fluctuated.",	
			"Reading-Part-4Q4 : it could be misleading for some students.", 	
			"Reading-Part-4Q5 : arguing multiple perspectives ought to be part of learning science.", 	
			"Reading-Part-4Q6 : should teach multiple perspectives on a subject.", 	
			"Reading-Part-4Q7 : we cannot rely on textbooks to provide a balanced view.", 	
			"Reading-Part-4Q8 : The issue of climate change and global warming",	
			"Reading-Part-4Q9 : make choices about which theories should be taught.", 	
			"Reading-Part-4Q10 : should present diverse positions",
			"Writing-Part-1 : W ",
			"Writing-Part-2 : W "};		

	String[] answersheet3 = {
			"Listening-Part1-Question1 : I put the luggage down at the entrance.",
			"Listening-Part1-Question2 : I buy things to make myself feel better.",
			"Listening-Part1-Question3 : Anne has a pleasant personality.",
			"Listening-Part1-Question4 : Going often to the dentist can prevent problems.",
			"Listening-Part1-Question5 : The teacher wants a piano player for the concert.",
			"Listening-Part1-Question6 : I prefer to arrive 30 minutes early.",
			"Listening-Part1-Question7 : Daily exercise can improve the way you look.",
			"Listening-Part1-Question8 : Drive carefully when there is a flashing yellow light.", 
			"Listening-Part2-Question1 : Italy does have the best cuisine in the world.",
			"Listening-Part2-Question2 : I’ve already seen it and it wasn’t terrifying.", 
			"Listening-Part2-Question3 : I think there’s a problem with the speakers.",
			"Listening-Part2-Question4 : You must have forgotten that I paid you back already.", 
			"Listening-Part2-Question5 : I found it too hard to stop eating desserts.", 
			"Listening-Part2-Question6 : Actually, it’s not for sale.",
			"Listening-Part2-Question7 : I stopped about 6 years ago.",
			"Listening-Part2-Question8 : I’d rather not have any cake.", 
			"Listening-Part4-Question1 : Husband and wife", 
			"Listening-Part4-Question2 : Annoyed", 
			"Listening-Part4-Question3 : Visit friends",
			"Listening-Part4-Question4 : Giving away their belongings",
			"Listening-Part4-Question5 : He looks good in it.",
			"Listening-Part5-Question1 : in an office",
			"Listening-Part5-Question2 : an apartment building manager",
			"Listening-Part5-Question3 : lease it",
			"Listening-Part5-Question4 : The space is arranged differently.", 
			"Listening-Part5-Question5 : She’s often away.",
			"Listening-Part5-Question6 : elevation",
			"Listening-Part6-Question1 : watched a magic show.",
			"Listening-Part6-Question2 : was in a crowd.",
			"Listening-Part6-Question3 : find out where his wallet was.",
			"Listening-Part6-Question4 : found the wallet.",
			"Listening-Part6-Question5 : precaution worked so well.",
			"Listening-Part8-Question1 : relieve some of the financial pressure that students face.",
			"Listening-Part8-Question2 : is working with several other professors.",
			"Listening-Part8-Question3 : there would be concern about the additional work.",
			"Listening-Part8-Question4 : the role of a professor is quite challenging.", 
			"Listening-Part8-Question5 : require a long period of time to publish a print text.",
			"Listening-Part8-Question6 : may choose either print or electronic textbooks.",
			"Reading-Part-1-Q1 : new driver’s parent.", 	
			"Reading-Part-1-Q2 : more than one non-family passenger.",  	
			"Reading-Part-1-Q3 : may increase the risk of accidents.",	
			"Reading-Part-1-Q4 : can’t drive his 5 classmates.", 	
			"Reading-Part-1-Q5 : knows his responsibilities as a driver.",	
			"Reading-Part-1-Q6 : will put more new drivers on the road.", 	
			"Reading-Part-1-Q7 : sharing your opinions.",	
			"Reading-Part-1-Q8 : may increase the risk of accident and injury.",	
			"Reading-Part-1-Q9 : several teenagers.",	
			"Reading-Part-1-Q10 : supports",	
			"Reading-Part-1-Q11 : care about the safety of young drivers.", 				
			"Reading-Part-2-Q1 : class times.",	
			"Reading-Part-2-Q2 : starting the day at 9 a.m. instead of 9 : 35 a.m.",	
			"Reading-Part-2-Q3 : there are no social activities in the morning.",	
			"Reading-Part-2-Q4 : outings",	
			"Reading-Part-2-Q5 : the transportation to and from",	
			"Reading-Part-2-Q6 : to ask for advice.", 	
			"Reading-Part-2-Q7 : featured social activities in the morning.",	
			"Reading-Part-2-Q8 : will be joining the students on the camping trip.",				
			"Reading-Part-3-Q1 : D", 	
			"Reading-Part-3-Q2 : E", 	
			"Reading-Part-3-Q3 : C", 	
			"Reading-Part-3-Q4 : D", 	
			"Reading-Part-3-Q5 : D", 	
			"Reading-Part-3-Q6 : E", 	
			"Reading-Part-3-Q7 : A", 	
			"Reading-Part-3-Q8 : C", 	
			"Reading-Part-3-Q9 : B", 				
			"Reading-Part-4-Q1 : doesn’t measure student progress.", 	
			"Reading-Part-4-Q2 : Valleyside", 	
			"Reading-Part-4-Q3 : gather statistical data. ",	
			"Reading-Part-4-Q4 : more limited. ", 	
			"Reading-Part-4-Q5 : divisive.", 	
			"Reading-Part-4-Q6 : defy", 	
			"Reading-Part-4-Q7 : of limited value,", 	
			"Reading-Part-4-Q8 : public",	
			"Reading-Part-4-Q9 : touched on", 	
			"Reading-Part-4-Q10 : provincial governments",
			"Writing-Part-1 : W ",
			"Writing-Part-2 : W "};

	String[] answersheet4 = {
			"Listening-Part1-Question1 : I can count on you to buy her a cake.",
        	"Listening-Part1-Question2 : Sarah's unaware that a party is going to be held for her.",
 	       	"Listening-Part1-Question3 : He is older than he looks.",
	        "Listening-Part1-Question4 : It's clear that you have done a lot of work.",
 	       	"Listening-Part1-Question5 : Rita is much too busy to assist me right now.",
 	       	"Listening-Part1-Question6 : Everyone attempted to talk him into going to the movie.",
	        "Listening-Part1-Question7 : I can finish the work when I replace my computer.",
	        "Listening-Part1-Question8 : Our opinions are of equal value.", 
	        "Listening-Part2-Question1 : The book was beside the telephone.",
	        "Listening-Part2-Question2 : I had lunch with him last Wednesday.", 
	        "Listening-Part2-Question3 : It has been sold out for a week.",
 	       	"Listening-Part2-Question4 : I am going to do the work myself.", 
       		"Listening-Part2-Question5 : We discussed the new priorities.", 
  	      	"Listening-Part2-Question6 : My friend has already offered to help me.",
  	      	"Listening-Part2-Question7 : I prefer the fashion and architecture there.",
  	      	"Listening-Part2-Question8 : I encourage them to ask a lot of questions.", 
			"Listening-Part4-Question1 : They work at the same location.", 
        	"Listening-Part4-Question2 : tiring", 
        	"Listening-Part4-Question3 : Outdoor activities have advantages.",
        	"Listening-Part4-Question4 : Work is easier than family life.",
        	"Listening-Part4-Question5 : complaints",
        	"Listening-Part5-Question1 : Details about workplace massages.",
        	"Listening-Part5-Question2 : He went to her business.",
        	"Listening-Part5-Question3 : For a special office event.",
        	"Listening-Part5-Question4 : Remain dressed and sit in a special chair.", 
        	"Listening-Part5-Question5 : Company staff all have health plans.",
        	"Listening-Part5-Question6 : Happy workers.",
        	"Listening-Part6-Question1 : in her clothing.",
        	"Listening-Part6-Question2 : taking clothes to a store.",
        	"Listening-Part6-Question3 : iwas pessimistic about getting it back.",
        	"Listening-Part6-Question4 : a girl found it and returned it to the store.",
        	"Listening-Part6-Question5 : the girl to go to a popular rock concert.",
        	"Listening-Part8-Question1 : to contribute to the city food bank for the poor.",
        	"Listening-Part8-Question2 : those too poor to purchase food are also too poor to produce it.",
        	"Listening-Part8-Question3 : it can boost a community’s supply of food.",
        	"Listening-Part8-Question4 : are often abandoned.", 
        	"Listening-Part8-Question5 : city chicken euthanization.",
        	"Listening-Part8-Question6 : tightened up.",
        	"Reading-Part-1-Q1 : to seek clarification.", 	
			"Reading-Part-1-Q2 : in the city government.",  	
			"Reading-Part-1-Q3 : the municipal government.",	
			"Reading-Part-1-Q4 : blocking a city-owned vehicle.", 	
			"Reading-Part-1-Q5 : dirty.",	
			"Reading-Part-1-Q6 : location.", 	
			"Reading-Part-1-Q7 : frustrating",	
			"Reading-Part-1-Q8 : pay the fine",	
			"Reading-Part-1-Q9 : cars being towed",	
			"Reading-Part-1-Q10 : the end of this week.",		
			"Reading-Part-1-Q11 : extensions", 				
			"Reading-Part-2-Q1 : very basic.",	
			"Reading-Part-2-Q2 : The Thunderbird Suites",	
			"Reading-Part-2-Q3 : The Brooke Suites",	
			"Reading-Part-2-Q4 : a fitness centre",	
			"Reading-Part-2-Q5 : have a swimming pool,",	
			"Reading-Part-2-Q6 : planning a trip with Mary.", 	
			"Reading-Part-2-Q7 : is fairly comfortable.",	
			"Reading-Part-2-Q8 : somewhat helpful.",				
			"Reading-Part-3-Q1 : B", 	
			"Reading-Part-3-Q2 : C", 	
			"Reading-Part-3-Q3 : D", 	
			"Reading-Part-3-Q4 : E", 	
			"Reading-Part-3-Q5 : C", 	
			"Reading-Part-3-Q6 : D", 	
			"Reading-Part-3-Q7 : A", 	
			"Reading-Part-3-Q8 : E", 	
			"Reading-Part-3-Q9 : B", 				
			"Reading-Part-4-Q1 : caregivers should live with their families.", 	
			"Reading-Part-4-Q2 : quicker ways of bringing her family to Canada.", 	
			"Reading-Part-4-Q3 : it provides an opportunity to apply for residency.",	
			"Reading-Part-4-Q4 : is undergoing successful reform.", 	
			"Reading-Part-4-Q5 : better budgeting for senior-care programs.", 	
			"Reading-Part-4-Q6 : abuse still happens to caregivers.", 	
			"Reading-Part-4-Q7 : complain about their workplace conditions,", 	
			"Reading-Part-4-Q8 : the labour laws.",	
			"Reading-Part-4-Q9 : won’t solve the problem.", 	
			"Reading-Part-4-Q10 : they will want to leave Canada.",
			"Writing-Part-1 : W ",
			"Writing-Part-2 : W "};	
		
		String[] answersheet5 = {
			"Listening-Part1-Question1 : Mary was not prepared for the test.",
        	"Listening-Part1-Question2 : Bill wanted to eat at home.",
 	       	"Listening-Part1-Question3 : In the end, John found his keys.",
	        "Listening-Part1-Question4 : Sam didn’t hear the news. ",
 	       	"Listening-Part1-Question5 : I didn’t visit John before he left. ",
 	       	"Listening-Part1-Question6 : Robert is acting badly.",
	        "Listening-Part1-Question7 : Susan continued working.",
	        "Listening-Part1-Question8 : Mary is feeling sick.", 
	        "Listening-Part2-Question1 : I bought it at a market in Hong Kong. ",
	        "Listening-Part2-Question2 : He called me last night. ", 
	        "Listening-Part2-Question3 : I’ll go if I have time. ",
 	       	"Listening-Part2-Question4 : We should be there by seven.", 
       		"Listening-Part2-Question5 : We were both too busy to go.", 
  	      	"Listening-Part2-Question6 : Of course, no problem at all.",
  	      	"Listening-Part2-Question7 : He said our new boss was quite friendly.",
  	      	"Listening-Part2-Question8 : Nothing. He decided to get a new one.", 
			"Listening-Part4-Question1 : Because the man was late.", 
        	"Listening-Part4-Question2 : An armed man was blocking traffic.", 
        	"Listening-Part4-Question3 : Outside a local shopping centre.",
        	"Listening-Part4-Question4 : She had already left home.",
        	"Listening-Part4-Question5 : Because others may be late as well.",
        	"Listening-Part5-Question1 : He works for a charity.",
        	"Listening-Part5-Question2 : He has observed ever more people needing help.",
        	"Listening-Part5-Question3 : A slow economy.",
        	"Listening-Part5-Question4 : They are often employed in low-income jobs. ",
        	"Listening-Part5-Question5 : Hearing people’s distorted ideas about families in need.",
        	"Listening-Part5-Question6 : Commitment to monthly donations.",
        	"Listening-Part6-Question1 : soared away while playing with balloons.",
        	"Listening-Part6-Question2 : near the top of a tall tree.",
        	"Listening-Part6-Question3 : very happy.",
        	"Listening-Part6-Question4 : his father destroyed all of the balloons.",
        	"Listening-Part6-Question5 : would love to repeat the adventure.",
        	"Listening-Part8-Question1 : support non-profit organizations. ",
        	"Listening-Part8-Question2 : are profiting from people’s illnesses.",
        	"Listening-Part8-Question3 : gambling is not usually an addictive activity.",
        	"Listening-Part8-Question4 : people can become addicted to almost any activity.", 
        	"Listening-Part8-Question5 : suspect the motives of gambling supporters.",
        	"Listening-Part8-Question6 : people will be protected from criminal organizations.",
        	"Reading-Part-1-Q1 : has just become city manager.", 	
			"Reading-Part-1-Q2 : represents his neighbours. ",  	
			"Reading-Part-1-Q3 : the sound of cars coming from the road.",	
			"Reading-Part-1-Q4 : planting trees near the townhouses.", 	
			"Reading-Part-1-Q5 : build a concrete wall by the highway.",	
			"Reading-Part-1-Q6 : asks that the city consider their request.", 	
			"Reading-Part-1-Q7 : traffic noise.",	
			"Reading-Part-1-Q8 : sleep",	
			"Reading-Part-1-Q9 : a concrete wall",	
			"Reading-Part-1-Q10 : cedar trees",		
			"Reading-Part-1-Q11 : at the top of the hill.", 				
			"Reading-Part-2-Q1 : commence at 8 : 30 a.m.",	
			"Reading-Part-2-Q2 : attend up to four sessions",	
			"Reading-Part-2-Q3 : select the sessions you wish to attend",	
			"Reading-Part-2-Q4 : select sessions D and E",	
			"Reading-Part-2-Q5 : Session L",	
			"Reading-Part-2-Q6 : is a conference organizer.", 	
			"Reading-Part-2-Q7 : starting a small business.",	
			"Reading-Part-2-Q8 : companies will be promoting business services.",				
			"Reading-Part-3-Q1 : A", 	
			"Reading-Part-3-Q2 : B", 	
			"Reading-Part-3-Q3 : D", 	
			"Reading-Part-3-Q4 : D", 	
			"Reading-Part-3-Q5 : D", 	
			"Reading-Part-3-Q6 : B", 	
			"Reading-Part-3-Q7 : A", 	
			"Reading-Part-3-Q8 : C", 	
			"Reading-Part-3-Q9 : E", 				
			"Reading-Part-4-Q1 : differences between men and women’s engagement in politics.", 	
			"Reading-Part-4-Q2 : school activities should reflect current issues in the political arena.", 	
			"Reading-Part-4-Q3 : play out political matters as they would in real life.",	
			"Reading-Part-4-Q4 : well-intended but ineffective.", 	
			"Reading-Part-4-Q5 : students views are not genuinely taken into account.", 	
			"Reading-Part-4-Q6 : is mostly dominated by just one gender", 	
			"Reading-Part-4-Q7 : young women", 	
			"Reading-Part-4-Q8 : School plays a central role in",	
			"Reading-Part-4-Q9 : the focus on national politics", 	
			"Reading-Part-4-Q10 : issues that the students can influence",
			"Writing-Part-1 : W ",
			"Writing-Part-2 : W "};
			
	String[] answersheet = answersheet1;
	if("2".equals(tid)){
		answersheet = answersheet2;
	}else if("3".equals(tid)){
		answersheet = answersheet3;
	}else if("4".equals(tid)){
		answersheet = answersheet4;
	}else if("5".equals(tid)){
		answersheet = answersheet5;
	}
	
    System.out.println("def answer sheets");

	String astr = "<h3>"+fn+"</h3><hr/><table border=1 celpadding=2>";
	
	int l_point=0;
	int r_point=0;
	boolean correct=false;
    
    System.out.println("length:"+answersheet.length+"   "+answers.length);
	if(answers!=null){
		for(int i=0; i<100; i++){
            String ans = "";

			if(i>=answersheet.length) break;
            if(i<answers.length) {ans = answers[i];}
			System.out.println(i+"==="+ans+"\n");
			String[] as = answersheet[i].split(" : ");
			if(as[1].equals(ans)){
				correct = true;
				if(i<38){
					l_point++;
				}else{
					r_point++;
				}	
			}else{
				correct = false;
			}
			
			astr += "<tr><td>"+(i+1)+"</td><td>"+as[0]+"</td><td>"+ans+"</td><td>"+as[1]+"</td><td>"+correct+"</td></tr>";
		}
	}
	astr += "</table><hr/>";
//	System.out.println("ast:"+astr);
	
	astr += "<h4> Listening Points :  "+l_point+"  [ "+ getLevel(l_point) +" ]</h4>";
	astr += "<h4> Reading Points :  "+r_point+"  [ "+ getLevel(r_point) +" ] </h4>";
	
	astr += "<hr>";
	astr += "<table border=1>";
	if(answers.length>=answersheet.length){
		astr += "<tr><td> Wring-Part-1 </td><td><textarea cols=80 rows=20>"+answers[answersheet.length]+"</textarea></td></tr>";
	}
	if(answers.length>answersheet.length){
		astr += "<tr><td> Wring-Part-2 </td><td><textarea cols=80 rows=20>"+answers[answersheet.length+1]+"</textarea></td></tr>";
	}	
	
	astr += "</table><hr/>";

	System.out.println("astr : "+astr);
	try {
    		PrintWriter pw = new PrintWriter(new FileOutputStream("/Users/user/"+fn+".html"));
//PrintWriter pw = new PrintWriter(new FileOutputStream("D : \\celpip\\testresult\\"+fn+".txt"));
    System.out.println("PW : "+pw);
    		pw.print(astr);
    		//clean up
    		pw.close();
	} catch(IOException e) {
   		System.out.println(e.getMessage());
	}

%>

<%!	
	private String getLevel(int point){
		switch(point){
			case 38 : 
			case 37 : 
			case 36 :  return "12";
			
			case 35 :  return "11";
			
			case 34 : 
			case 33 :  return "10";
			
			case 32 : 
			case 31 : 
			case 30 :  return "9";
			
			case 29 : 
			case 28 :  return "8";
			
			case 27 : 
			case 26 : 
			case 25 : 
			case 24 :  return "7";
			
			case 23 : 
			case 22 : 
			case 21 : 
			case 20 : 
			case 19 :  return "6";
			
			case 18 : 
			case 17 : 
			case 16 : 
			case 15 :  return "5";
			
			case 14 : 
			case 13 : 
			case 12 : 
			case 11 : 
			case 10 :  return "4";
			
			case 9 : 
			case 8 : 
			case 7 :  return "3";
			
			case 6 : 
			case 5 : 
			case 4 : 
			case 3 : 
			case 2 : 
			case 1 : 
			case 0 :  return "M";
			
			default :  return "";
		}	
	}
%>


