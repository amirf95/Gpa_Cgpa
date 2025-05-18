<%
' Declare variables
Dim adoCon, rsGuestbook, strSQL
Dim i, count, course, credit, grade
Dim totalPoints, totalCredits, value

' Create ADO connection
Set adoCon = Server.CreateObject("ADODB.Connection")
adoCon.Open "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("book.mdb")

' Insert GPA Records
count = CInt(Request.Form("count"))
For i = 0 To count - 1
    course = Replace(Request.Form("course" & i), "'", "''")
    credit = CDbl(Request.Form("credit" & i))
    grade = Request.Form("grade" & i)

    adoCon.Execute "INSERT INTO GPA_Records (CourseName, Credits, Grade) VALUES ('" & course & "', " & credit & ", '" & grade & "')"
Next

' GPA Calculation
Response.ContentType = "text/plain"
totalPoints = 0
totalCredits = 0

For i = 0 To count - 1
    credit = CDbl(Request.Form("credit" & i))
    grade = Request.Form("grade" & i)

    Select Case grade
        Case "AA": value = 4.0
        Case "BA": value = 3.5
        Case "BB": value = 3.0
        Case "CB": value = 2.5
        Case "CC": value = 2.0
        Case "DC": value = 1.5
        Case "DD": value = 1.0
        Case "FF": value = 0.0
        Case Else: value = 0
    End Select

    totalCredits = totalCredits + credit
    totalPoints = totalPoints + (credit * value)
Next

If totalCredits > 0 Then
    Response.Write FormatNumber(totalPoints / totalCredits, 2)
Else
    Response.Write "0.00"
End If

' Clean up
adoCon.Close
Set adoCon = Nothing
%>

Response.Write "<br><br>Saved Records:<br>"

Set rsGuestbook = Server.CreateObject("ADODB.Recordset")
strSQL = "SELECT CourseName, Credits, Grade FROM GPA_Records"
rsGuestbook.Open strSQL, adoCon

Do While Not rsGuestbook.EOF
    Response.Write "Course: " & rsGuestbook("CourseName") & "<br>"
    Response.Write "Credits: " & rsGuestbook("Credits") & "<br>"
    Response.Write "Grade: " & rsGuestbook("Grade") & "<br><hr>"
    rsGuestbook.MoveNext
Loop

rsGuestbook.Close
Set rsGuestbook = Nothing
