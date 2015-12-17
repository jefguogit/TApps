<%@ page import="java.sql.*"%>

<%
	String tid = request.getParameter("tid");
	String pid = request.getParameter("pid");
	if((pid==null)||pid.isEmpty()) pid="0";
	
	
	Connection c = null;
    Statement stmt = null;
    try {
      Class.forName("org.sqlite.JDBC");
      c = DriverManager.getConnection("jdbc:sqlite:"+getServletContext().getRealPath("exam.db"));
//      out.println("Opened database successfully");
      
      stmt = c.createStatement();
	  String query = "SELECT * FROM PT"+tid+" WHERE pid="+pid;
out.println("<!-- Query:"+query+"-->");	  
      ResultSet rs = stmt.executeQuery(query);
      while ( rs.next() ) {
         int id = rs.getInt("id");
         String  title = rs.getString("title");
         String content  = rs.getString("content");
         String answer = rs.getString("answer");
		 out.println(content);
      }
      rs.close();
      stmt.close();
      c.close();
      
      
      
    } catch ( Exception e ) {
      out.println( e.getClass().getName() + ": " + e.getMessage() );
    }
    
 %>


