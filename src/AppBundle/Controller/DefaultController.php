<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Order;
use AppBundle\Entity\OrderItems;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
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

    /**
     * @Route("/place_order", name="order_place")
     * @Method({"POST"})
     */
    public function placeOrderAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $request->request->replace($data);
        $items = $request->get('items', null);

        if (!$items) {
            return new JsonResponse(array('message' => 'Invalid request'), 400);
        }

        $cloudinary = $this->get('speicher210_cloudinary.uploader');
        $em = $this->getDoctrine()->getManager();

        $order = new Order();

        $userRepo = $em->getRepository('ApplicationSonataUserBundle:User');
        $user = $userRepo->findOneBy(['username' => 'mail@2sane.ru']);

        $order->setUser($user);
        $em->persist($order);

        foreach($items as $item) {
            $orderItem = new OrderItems();
            $orderItem->setOrder($order);
            $orderItem->setName($item['name']);
            $orderItem->setColor($item['color']);
            $orderItem->setPrice($item['price']);
            $orderItem->setLogos(json_encode($item['logos']));
            $orderItem->setTextureUrl($item['texturePath']);

            $uploadedScreenshot = $cloudinary->upload($item['screenshot']);
            $orderItem->setScreenshotUrl($uploadedScreenshot['url']);

            $em->persist($orderItem);
        }


        $em->flush();

        return new JsonResponse(['message' => 'OK PUK'], 200);
    }

}
