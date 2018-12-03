package net.daw.control;

import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.daw.bean.ReplyBean;
import net.daw.connection.publicinterface.ConnectionInterface;
import net.daw.constant.ConfigurationConstants;
import net.daw.constant.ConfigurationConstants.EnvironmentConstans;
import net.daw.constant.ConnectionConstants;
import net.daw.factory.ConnectionFactory;
import net.daw.factory.ServiceFactory;
import net.daw.helper.EncodingHelper;
import net.daw.helper.JsonHelper;

/**
 * Servlet implementation class json
 */
public class json extends HttpServlet {

    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public json() {
        super();
        //TODO Auto-generated constructor stub
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("application/json;charset=UTF-8");
        
        response.setHeader("Access-Control-Allow-Origin", request.getHeader("origin"));
        response.setHeader("Access-Control-Allow-Methods", "GET,POST");
        response.setHeader("Access-Control-Max-Age", "86400");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setHeader("Access-Control-Allow-Headers", "Origin, Accept, x-requested-with, Content-Type");
        String strJson = "";
        JsonHelper json = new JsonHelper();
        String strOb = request.getParameter("ob");
        String strOp = request.getParameter("op");

        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (Exception ex) {
            strJson = "{\"status\":500,\"msg\":\"jdbc driver not found\"}";
        }
        try {
            ReplyBean oReplyBean = ServiceFactory.executeService(request);
            strJson = json.strJson(oReplyBean.getStatus(), oReplyBean.getJson());
            Gson oGson = new Gson();
            oGson.toJson(strJson);
        } catch (Exception e) {
            response.setStatus(500);
            strJson = json.strJson(500, "Server Error");
            if (ConfigurationConstants.environment == EnvironmentConstans.Debug) {
                response.getWriter().println(e.getMessage());
                e.printStackTrace(response.getWriter());
                PrintWriter out = response.getWriter();
                out.println(e.getMessage());
                e.printStackTrace(out);
            }
        }

        //*******************************************************************************
        /*if (strOb.equalsIgnoreCase("usuario")) {
            if (strOp.equalsIgnoreCase("connect")) {
                try {
                    ConnectionInterface oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
                    Connection oConnection = oConnectionPool.newConnection();
                    //servir la petición utilizando oConnection
                    oConnectionPool.disposeConnection();

                    response.setStatus(200);
                    strJson = "{\"status\":200,\"msg\":\"Connection OK\"}";
                    //strJson = json.strJson(200, "Connection OK");

                } catch (Exception ex) {
                    response.setStatus(500);
                    //strJson = "{\"status\":500,\"msg\":\"Bad Connection: " + EncodingHelper.escapeQuotes(EncodingHelper.escapeLine(ex.getMessage())) + "\"}";
                    strJson = json.strJson(500, "Bad Connection: " + EncodingHelper.escapeQuotes(EncodingHelper.escapeLine(ex.getMessage())));
                }

            }

            HttpSession oSession = request.getSession();

            if (strOp.equalsIgnoreCase("login")) {
                String strUser = request.getParameter("user");
                String strPass = request.getParameter("pass");
                if (strUser.equals("rafa") && strPass.equalsIgnoreCase("afd6a5c08bbc2020ba99e1ffd02d0607c4e75efed3f547e5588f7bebc8c371ff")) {
                    oSession.setAttribute("daw", strUser);
                    response.setStatus(200);
                    strJson = "{\"status\":200,\"msg\":\"" + strUser + "\"}";
                    //strJson = json.strJson(200, strUser);
                } else {
                    response.setStatus(401);
                    strJson = "{\"status\":401,\"msg\":\"Authentication error\"}";
                    //strJson = json.strJson(401, "Authentication error");
                }
            }
            if (strOp.equalsIgnoreCase("logout")) {
                oSession.invalidate();
                response.setStatus(200);
                strJson = "{\"status\":200,\"msg\":\"Session is closed\"}";
                //strJson = json.strJson(200, "Session is closed");
            }
            if (strOp.equalsIgnoreCase("check")) {
                String strUserName = (String) oSession.getAttribute("daw");
                if (strUserName != null) {
                    response.setStatus(200);
                    strJson = "{\"status\":200,\"msg\":\"" + strUserName + "\"}";
                    //strJson = json.strJson(200, "Session is closed");
                } else {
                    response.setStatus(401);
                    strJson = "{\"status\":401,\"msg\":\"Authentication error\"}";
                    //strJson = json.strJson(401, "Authentication error");
                }
            }
            if (strOp.equalsIgnoreCase("getsecret")) {
                String strUserName = (String) oSession.getAttribute("daw");
                if (strUserName != null) {
                    response.setStatus(200);
                    strJson = "{\"status\":200,\"msg\":\"985739847598\"}";
                    //strJson = json.strJson(200, "985739847598");
                } else {
                    response.setStatus(401);
                    strJson = "{\"status\":401,\"msg\":\"Authentication error\"}";
                    //strJson = json.strJson(401, "Authentication error");
                }

            }
        } else {
            response.setStatus(500);
            //strJson = "{\"status\":500,\"msg\":\"operation or object empty\"}";
            strJson = json.strJson(500, "operation or object empty");
        }*/
        response.getWriter().append(strJson);
    }
}
