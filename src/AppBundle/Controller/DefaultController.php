<?php

namespace AppBundle\Controller;

use AppBundle\Form\Type\TestType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->render('shop/index.html.twig', []);
    }

    /**
     * @Route("/item", name="item")
     */
    public function itemAction(Request $request)
    {
        return $this->render('shop/single.html.twig', []);
    }

    /**
     * @Route("/order", name="order")
     */
    public function orderAction(Request $request)
    {
        return $this->render('shop/single.html.twig', []);
    }
}
