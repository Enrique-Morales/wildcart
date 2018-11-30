/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.service;

import com.google.gson.Gson;
import java.sql.Connection;

import java.sql.SQLException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import net.daw.bean.FacturaBean;
import net.daw.bean.ItemBean;
import net.daw.bean.ProductoBean;
import net.daw.bean.ReplyBean;
import net.daw.connection.publicinterface.ConnectionInterface;
import net.daw.constant.ConnectionConstants;
import net.daw.dao.FacturaDao;
import net.daw.dao.ProductoDao;
import net.daw.factory.ConnectionFactory;
import net.daw.helper.EncodingHelper;

/**
 *
 * @author a048405932v
 */
public class CartService {

    HttpServletRequest oRequest;
    String ob = null;
    Gson oGson = new Gson();
    ReplyBean oReplyBean;
    ArrayList<ItemBean> cart = null;
    Connection oConnection=null;

    public CartService(HttpServletRequest oRequest) {
        super();
        this.oRequest = oRequest;
        ob = oRequest.getParameter("ob");
    }

    public ReplyBean add() throws Exception {
        ConnectionInterface oConnectionPool = null;
        //Obtenemos la sesion actual
        HttpSession sesion = oRequest.getSession();

        try {
            Connection oConnection;

            //Si no existe la sesion creamos al carrito
            if (sesion.getAttribute("cart") == null) {
                cart = new ArrayList<ItemBean>();
            } else {
                cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
            }

            //Obtenemos el producto que deseamos añadir al carrito
            Integer id = Integer.parseInt(oRequest.getParameter("prod"));
            Integer cant = Integer.parseInt(oRequest.getParameter("cant"));
            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
            oConnection = oConnectionPool.newConnection();
            ProductoDao oProductoDao = new ProductoDao(oConnection, "producto");
            ProductoBean oProductoBean = oProductoDao.get(id, 2);
            Integer existencias = oProductoBean.getExistencias();

            //Para saber si tenemos agregado el producto al carrito de compras
            int indice = -1;
            //recorremos todo el carrito de compras
            for (int i = 0; i < cart.size(); i++) {
                if (oProductoBean.getId() == cart.get(i).getObj_producto().getId()) {
                    //Si el producto ya esta en el carrito, obtengo el indice dentro
                    //del arreglo para actualizar al carrito de compras
                    indice = i;
                    break;
                }
            }
            ItemBean oItemBean = new ItemBean();
            if (indice == -1) {
                //Si es -1 es porque voy a registrar
                if (existencias > 0 && existencias > cant) {
                    oItemBean.setObj_producto(oProductoBean);
                    oItemBean.setCantidad(cant);
                    cart.add(oItemBean);
                }
            } else {
                //Si es otro valor es porque el producto esta en el carrito
                //y vamos actualizar la cantidad
                Integer cantidad = cart.get(indice).getCantidad() + cant;
                if (existencias > cantidad) {
                    cart.get(indice).setCantidad(cantidad);
                }
            }
            //Actualizamos la sesion del carrito de compras
            sesion.setAttribute("cart", cart);

            oReplyBean = new ReplyBean(200, oGson.toJson(cart));

        } catch (Exception ex) {
//            Logger.getLogger(CartService.class.getName()).log(Level.SEVERE, null, ex);
            oReplyBean = new ReplyBean(500, "Error en add CartService: " + ex.getMessage());
        } finally {
            oConnectionPool.disposeConnection();
        }
        return oReplyBean;
    }

    public ReplyBean reduce() throws Exception {
        ConnectionInterface oConnectionPool = null;
        //Obtenemos la sesion actual
        HttpSession sesion = oRequest.getSession();

        try {

            //Si no existe la sesion creamos al carrito
            cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");

            //Obtenemos el producto que deseamos añadir al carrito
            Integer id = Integer.parseInt(oRequest.getParameter("prod"));

            //Para saber si tenemos agregado el producto al carrito de compras
            int indice = -1;
            //recorremos todo el carrito de compras
            for (int i = 0; i < cart.size(); i++) {
                if (id == cart.get(i).getObj_producto().getId()) {
                    cart.remove(i);
                    break;
                }
            }

            //Actualizamos la sesion del carrito de compras
            sesion.setAttribute("cart", cart);

            oReplyBean = new ReplyBean(200, oGson.toJson(cart));

        } catch (Exception ex) {
//            Logger.getLogger(CartService.class.getName()).log(Level.SEVERE, null, ex);
            oReplyBean = new ReplyBean(500, "Error en reduce CartService: " + ex.getMessage());
        }
        return oReplyBean;
    }

    public ReplyBean show() throws Exception {

        HttpSession sesion = oRequest.getSession();

        try {

            cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
            if (cart == null || cart.size() <= 0) {
                oReplyBean = new ReplyBean(200, EncodingHelper.quotate("Carrito vacio"));
            } else {
                cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");
                oReplyBean = new ReplyBean(200, oGson.toJson(cart));
            }

//            oReplyBean = new ReplyBean(200, oGson.toJson(cart));

        } catch (Exception e) {
            oReplyBean = new ReplyBean(500, "Error en add CartService: " + e.getMessage());
        }

        return oReplyBean;
    }

    public ReplyBean empty() {

        HttpSession sesion = oRequest.getSession();

        cart = (ArrayList<ItemBean>) sesion.getAttribute("cart");

        cart.clear();

        sesion.setAttribute("cart", cart);

        oReplyBean = new ReplyBean(200, EncodingHelper.quotate("Carrito vacio"));

        return oReplyBean;
    }

    public ReplyBean buy() {

        ConnectionInterface oConnectionPool = null;
        //Obtenemos la sesion actual
        HttpSession sesion = oRequest.getSession();

        try {

            oConnectionPool = ConnectionFactory.getConnection(ConnectionConstants.connectionPool);
            oConnection = oConnectionPool.newConnection();

            oConnection.setAutoCommit(false);
            
            FacturaBean oFacturaBean = new FacturaBean();
            
            ZoneId defaultZoneId = ZoneId.systemDefault();
//        Instant instant = Date..toInstant();
//        LocalDate localDate = instant.atZone(defaultZoneId).toLocalDate();
            
            oFacturaBean.setFecha(null);
            

            
            FacturaDao oFacturaDao = new FacturaDao(oConnection, "factura");
            
            oFacturaDao.create(oFacturaBean);
            

        } catch (Exception e) {

            try {
                oConnection.rollback();
            } catch(SQLException excep) {
                
            }

            oReplyBean = new ReplyBean(500, "Error en buy CartService: " + e.getMessage());
        }

        return null;

    }

}
