<%
Response.ContentType = "text/plain"

Dim adoCon, count, i, gpa, credits, semester
Dim totalPoints, totalCredits

' Connect to the database
Set adoCon = Server.CreateObject("ADODB.Connection")
adoCon.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("book.mdb")

' Get the number of submitted rows
count = CInt(Request.Form("count"))

' Initialize totals
totalPoints = 0
totalCredits = 0

' Loop through and insert
For i = 0 To count - 1
    gpa = CDbl(Request.Form("gpa" & i))
    credits = CDbl(Request.Form("credits" & i))
    semester = i + 1

    ' Optional: insert into the database
    adoCon.Execute "INSERT INTO CGPA_Records (SemesterNumber, GPA, TotalCredits) VALUES (" & semester & ", " & gpa & ", " & credits & ")"

    ' Accumulate total
    totalPoints = totalPoints + (gpa * credits)
    totalCredits = totalCredits + credits
Next

' Final CGPA calculation
If totalCredits > 0 Then
    Response.Write FormatNumber(totalPoints / totalCredits, 2)
Else
    Response.Write "0.00"
End If

' Cleanup
adoCon.Close
Set adoCon = Nothing
%>
