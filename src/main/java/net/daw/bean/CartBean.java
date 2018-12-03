/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package net.daw.bean;

import java.util.ArrayList;

/**
 *
 * @author emorc
 */
public class CartBean {
    
    private ArrayList<ItemBean> carrito;

    public ArrayList<ItemBean> getCarrito() {
        return carrito;
    }

    public void setCarrito(ArrayList<ItemBean> carrito) {
        this.carrito = carrito;
    }
    
    
    
}
